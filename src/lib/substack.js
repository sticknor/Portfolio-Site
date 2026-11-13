import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";

/** Substack URLs. Update these if the publication subdomain or section changes. */
export const SUBSTACK = {
  publication: "https://sammytthebrave.substack.com",
  processFeed: "https://sammytthebrave.substack.com/feed?sectionId=503003",
  /** Process section id from the section page's RSS link. */
  processSectionId: 503003,
  processSignup: "https://sammytthebrave.substack.com/s/process",
  announcementsSignup: "https://sammytthebrave.substack.com/subscribe",
};

const FEED_TTL_MS = 60 * 60 * 1000;
const POST_LIMIT = 20;

const parser = new Parser({
  customFields: {
    item: [
      ["content:encoded", "encoded"],
      ["description", "descriptionHtml"],
    ],
  },
});

let cache = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(value) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDataAttrs(el) {
  const raw = el.getAttribute("data-attrs");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    try {
      return JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    } catch {
      return {};
    }
  }
}

function slugFromUrl(href) {
  try {
    const url = new URL(href, SUBSTACK.publication);
    const parts = url.pathname.split("/").filter(Boolean);
    const index = parts.indexOf("p");
    if (index === -1 || !parts[index + 1]) return "";
    return decodeURIComponent(parts[index + 1]);
  } catch {
    return "";
  }
}

function imageKey(url) {
  const match = String(url).match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  );
  return match ? match[0].toLowerCase() : String(url);
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(date);
}

/**
 * Turn Substack post HTML into the article itself: prose, pictures, captions.
 * Subscribe buttons, video players, and icon chrome stay on Substack.
 */
function simplifySubstackHtml(html, postId, postTitle) {
  if (!html) return "";
  const root = parse(`<div id="substack-body">${html}</div>`);
  const body = root.querySelector("#substack-body");
  if (!body) return "";

  for (const el of [...body.querySelectorAll(".mention-wrap")]) {
    const attrs = parseDataAttrs(el);
    const name = attrs.name || attrs.title || "";
    if (!name) {
      el.remove();
      continue;
    }
    if (attrs.url) {
      el.replaceWith(
        `<a href="${escapeHtml(attrs.url)}">${escapeHtml(name)}</a>`,
      );
    } else {
      el.replaceWith(escapeHtml(name));
    }
  }

  for (const el of [...body.querySelectorAll(".image-gallery-embed")]) {
    const attrs = parseDataAttrs(el);
    const images = attrs.gallery?.images || [];
    const caption = attrs.gallery?.caption || "";
    const alt = attrs.gallery?.alt || caption || postTitle;
    if (!images.length) {
      el.remove();
      continue;
    }
    const imgs = images
      .filter((image) => image?.src)
      .map(
        (image) =>
          `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(alt || postTitle)}" />`,
      )
      .join("");
    const captionHtml = caption
      ? `<figcaption>${escapeHtml(caption)}</figcaption>`
      : "";
    el.replaceWith(`<figure>${imgs}${captionHtml}</figure>`);
  }

  for (const el of [...body.querySelectorAll(".twitter-embed")]) {
    const attrs = parseDataAttrs(el);
    const text = attrs.full_text || "";
    const url = attrs.url || "";
    const name = attrs.name || "View post";
    if (!text && !url) {
      el.remove();
      continue;
    }
    const quote = text ? `<p>${escapeHtml(text)}</p>` : "";
    const credit = url
      ? `<p><a href="${escapeHtml(url)}">${escapeHtml(name)}</a></p>`
      : "";
    el.replaceWith(`<blockquote>${quote}${credit}</blockquote>`);
  }

  for (const el of [...body.querySelectorAll(".embedded-post-wrap")]) {
    const attrs = parseDataAttrs(el);
    if (attrs.url && attrs.title) {
      el.replaceWith(
        `<p><a href="${escapeHtml(attrs.url)}">${escapeHtml(attrs.title)}</a></p>`,
      );
    } else {
      el.remove();
    }
  }

  for (const el of [...body.querySelectorAll(".native-video-embed")]) {
    el.remove();
  }

  for (const el of [
    ...body.querySelectorAll("button, svg, .icon-container, .image-link-expand"),
  ]) {
    el.remove();
  }

  for (const picture of [...body.querySelectorAll("picture")]) {
    const img = picture.querySelector("img");
    if (img) picture.replaceWith(img.toString());
    else picture.remove();
  }

  for (const figure of [...body.querySelectorAll("figure")]) {
    const img = figure.querySelector("img");
    if (!img) continue;
    const caption = figure.querySelector("figcaption");
    figure.set_content(
      `${img.toString()}${caption ? caption.toString() : ""}`,
    );
  }

  for (const el of [...body.querySelectorAll("[id]")]) {
    if (el.id.startsWith("footnote")) el.id = `${postId}-${el.id}`;
  }
  for (const anchor of [...body.querySelectorAll("a")]) {
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("#footnote")) {
      anchor.setAttribute("href", `#${postId}-${href.slice(1)}`);
    }
  }

  for (const img of [...body.querySelectorAll("img")]) {
    const attrs = parseDataAttrs(img);
    const src = img.getAttribute("src") || attrs.src || "";
    if (!src.startsWith("https://")) {
      img.remove();
      continue;
    }
    const figure = img.closest("figure");
    const caption = figure?.querySelector("figcaption")?.text?.trim();
    const alt = attrs.alt || img.getAttribute("alt") || caption || postTitle;
    img.setAttribute("src", src);
    img.setAttribute("alt", alt || postTitle);
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");
  }

  for (const anchor of [...body.querySelectorAll("a")]) {
    const imgs = anchor.querySelectorAll("img");
    if (imgs.length && !anchor.text.trim()) {
      anchor.replaceWith(anchor.innerHTML);
      continue;
    }
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("#")) continue;
    let ok = false;
    try {
      const url = new URL(href, SUBSTACK.publication);
      ok = ["http:", "https:", "mailto:"].includes(url.protocol);
    } catch {
      ok = false;
    }
    if (!ok) anchor.replaceWith(escapeHtml(anchor.text));
  }

  for (const el of [...body.querySelectorAll("script, style, iframe, form")]) {
    el.remove();
  }

  const keep = {
    a: new Set(["href", "id"]),
    img: new Set(["src", "alt", "loading", "decoding"]),
  };
  for (const el of body.querySelectorAll("*")) {
    const allowed = keep[el.tagName.toLowerCase()] || new Set(["id"]);
    for (const name of Object.keys(el.attributes)) {
      if (!allowed.has(name.toLowerCase())) el.removeAttribute(name);
    }
  }

  return body.innerHTML;
}

function sanitizePostHtml(html, slugToId) {
  return sanitizeHtml(html, {
    allowedTags: [
      "a",
      "b",
      "blockquote",
      "br",
      "em",
      "i",
      "figcaption",
      "figure",
      "h2",
      "h3",
      "h4",
      "hr",
      "img",
      "li",
      "ol",
      "p",
      "strong",
      "ul",
    ],
    allowedAttributes: {
      a: ["href", "id", "target", "rel"],
      img: ["src", "alt", "loading", "decoding"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
      p: ["id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const id = attribs.id ? { id: attribs.id } : {};
        if (href.startsWith("#")) {
          return { tagName: "a", attribs: { href, ...id } };
        }
        let safe = "";
        try {
          const url = new URL(href, SUBSTACK.publication);
          if (["http:", "https:", "mailto:"].includes(url.protocol)) {
            safe = url.href;
          }
        } catch {
          safe = "";
        }
        if (!safe) return { tagName: "em", attribs: {} };
        const slug = slugFromUrl(safe);
        const localId = slug && slugToId.get(slug);
        if (localId) {
          return { tagName: "a", attribs: { href: `#${localId}`, ...id } };
        }
        return {
          tagName: "a",
          attribs: {
            href: safe,
            target: "_blank",
            rel: "noreferrer",
            ...id,
          },
        };
      },
    },
  });
}

function fieldText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && typeof value._ === "string") return value._;
  return "";
}

function subtitleFor(description, bodyText) {
  const text = stripTags(description);
  if (!text || text.length > 280) return "";
  if (bodyText.startsWith(text)) return "";
  return text;
}

function coverUrl(item) {
  const enclosure = item.enclosure;
  if (!enclosure?.url?.startsWith("https://")) return "";
  const type = enclosure.type || "";
  if (type && !type.startsWith("image/")) return "";
  return enclosure.url;
}

export function postsFromFeed(xml, slugs = null) {
  return parser.parseString(xml).then((feed) => {
    let items = feed.items || [];
    if (slugs) {
      items = items.filter((item) => slugs.has(slugFromUrl(item.link || "")));
    }
    items = items.slice(0, POST_LIMIT);
    const drafts = [];
    const usedIds = new Set();
    const slugToId = new Map();

    for (const item of items) {
      const link = item.link || SUBSTACK.publication;
      const slug = slugFromUrl(link) || "note";
      let id = slug;
      let n = 2;
      while (usedIds.has(id)) id = `${slug}-${n++}`;
      usedIds.add(id);
      slugToId.set(slug, id);
      drafts.push({ item, id, link });
    }

    return drafts.map(({ item, id, link }) => {
      const title = (item.title || "Studio note").trim();
      const raw = fieldText(
        item.encoded || item["content:encoded"] || item.content || "",
      );
      const simplified = simplifySubstackHtml(raw, id, title);
      const html = sanitizePostHtml(simplified, slugToId);
      const bodyText = stripTags(html);
      const enclosure = coverUrl(item);
      const shownInBody =
        enclosure &&
        (html.includes(enclosure) || html.includes(imageKey(enclosure)));
      return {
        id,
        title,
        link,
        date: formatDate(item.isoDate || item.pubDate),
        subtitle: subtitleFor(fieldText(item.descriptionHtml), bodyText),
        html,
        cover: enclosure && !shownInBody ? enclosure : "",
      };
    });
  });
}

const FEED_HEADERS = {
  Accept: "application/rss+xml, application/xml, text/xml, */*",
  "User-Agent": "samt.work",
};

async function fetchFeedXml(url) {
  const response = await fetch(url, {
    headers: FEED_HEADERS,
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Feed responded ${response.status}`);
  const xml = await response.text();
  if (!xml.includes("<rss") && !xml.includes("<feed")) {
    throw new Error("Response was not a feed");
  }
  return xml;
}

/**
 * Slugs of posts in the Process section, newest first.
 * The section RSS can lag a new post; the archive listing is what Substack
 * itself uses to say which notes belong to Process.
 */
async function processSectionSlugs() {
  const url = new URL("/api/v1/archive", SUBSTACK.publication);
  url.searchParams.set("sort", "new");
  url.searchParams.set("limit", String(POST_LIMIT));
  url.searchParams.set("section_id", String(SUBSTACK.processSectionId));
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "samt.work" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Section list responded ${response.status}`);
  const data = await response.json();
  return (data.posts || [])
    .filter(
      (post) =>
        post.section_id === SUBSTACK.processSectionId ||
        post.section_slug === "process",
    )
    .map((post) => post.slug)
    .filter(Boolean);
}

/** Full notes in a column. Past this, the latest stays open and the rest are titles. */
const STACK_UNTIL = 2;

/**
 * Recent Process posts, fetched at build time (and cached for an hour in dev).
 * `{ ok: false }` when the feed cannot be read. An empty list is a valid feed.
 */
export async function loadProcessPosts() {
  if (cache && Date.now() - cache.at < FEED_TTL_MS) return cache.value;

  try {
    const sectionXml = await fetchFeedXml(SUBSTACK.processFeed);
    let posts = await postsFromFeed(sectionXml);

    // A brand-new Process note shows up in the publication feed before the
    // section feed. Keep only the notes the section listing names.
    if (posts.length === 0) {
      const slugs = new Set(await processSectionSlugs());
      if (slugs.size) {
        const mainXml = await fetchFeedXml(`${SUBSTACK.publication}/feed`);
        const bySlug = new Map(
          (await postsFromFeed(mainXml, slugs)).map((post) => [post.id, post]),
        );
        posts = [...slugs].map((slug) => bySlug.get(slug)).filter(Boolean);
      }
    }

    const value = { ok: true, posts };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    console.warn(
      `Process feed unavailable: ${err instanceof Error ? err.message : err}`,
    );
    return { ok: false, posts: [] };
  }
}

export { STACK_UNTIL };
