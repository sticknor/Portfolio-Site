/**
 * Build-time Airtable snapshot.
 *
 * Fetches every table the site needs, downloads all image attachments,
 * generates responsive WebP variants with sharp, and writes plain JSON to
 * src/data/ for the Astro build to consume. Airtable attachment URLs expire
 * after a few hours, so images MUST be self-hosted for a static deploy.
 *
 * Usage: AIRTABLE_API_KEY=... node scripts/fetch-airtable.mjs
 *
 * Outputs (all gitignored, regenerated on every deploy):
 *   .cache/airtable-images/   downloaded originals, cached by attachment id
 *   public/media/             responsive .webp variants served by the site
 *   src/data/*.json           site content
 */
import Airtable from "airtable";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = path.join(ROOT, ".cache", "airtable-images");
const MEDIA_DIR = path.join(ROOT, "public", "media");
const DATA_DIR = path.join(ROOT, "src", "data");

const API_KEY = process.env.AIRTABLE_API_KEY;
if (!API_KEY) {
  console.error("Missing AIRTABLE_API_KEY environment variable.");
  process.exit(1);
}

const BASE_ID = "apptr77RaXLy74iuy";
const VARIANT_WIDTHS = [480, 960, 1600];
const MAX_WIDTH = 2400; // cap for the largest (lightbox) variant
const WEBP_QUALITY = 80;

Airtable.configure({ endpointUrl: "https://api.airtable.com", apiKey: API_KEY });
const base = Airtable.base(BASE_ID);

function fetchAll(tableName, options = {}) {
  return new Promise((resolve, reject) => {
    const rows = [];
    base(tableName)
      .select({ view: "Grid view", ...options })
      .eachPage(
        (records, next) => {
          rows.push(...records);
          next();
        },
        (err) => (err ? reject(err) : resolve(rows)),
      );
  });
}

/** Download an attachment original into the cache (skips if present). */
async function downloadOriginal(attachment) {
  const file = path.join(CACHE_DIR, attachment.id);
  try {
    await fs.access(file);
    return file;
  } catch {
    /* not cached yet */
  }
  const res = await fetch(attachment.url);
  if (!res.ok) throw new Error(`Failed to download ${attachment.url}: ${res.status}`);
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

/**
 * Turn an Airtable attachment into locally hosted responsive WebP variants.
 * Returns { src, srcSet, width, height } with site-absolute /media/ URLs.
 */
async function processAttachment(attachment) {
  const original = await downloadOriginal(attachment);
  const meta = await sharp(original).metadata();
  const origWidth = meta.width ?? MAX_WIDTH;
  const origHeight = meta.height ?? MAX_WIDTH;

  const widths = VARIANT_WIDTHS.filter((w) => w < origWidth);
  widths.push(Math.min(origWidth, MAX_WIDTH));

  const parts = [];
  for (const w of widths) {
    const name = `${attachment.id}-${w}.webp`;
    const out = path.join(MEDIA_DIR, name);
    try {
      await fs.access(out);
    } catch {
      await sharp(original)
        .rotate() // respect EXIF orientation
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);
    }
    parts.push({ url: `/media/${name}`, width: w });
  }

  const largest = parts[parts.length - 1];
  const displayWidth = Math.min(origWidth, MAX_WIDTH);
  return {
    src: largest.url,
    srcSet: parts.map((p) => `${p.url} ${p.width}w`).join(", "),
    width: displayWidth,
    height: Math.round((origHeight / origWidth) * displayWidth),
  };
}

/** Process the first attachment of a field, or null. */
async function firstImage(attachments) {
  if (!attachments || attachments.length === 0) return null;
  const att = attachments[0];
  try {
    return await processAttachment(att);
  } catch (err) {
    console.warn(`  ! image ${att.id} (${att.filename}) failed: ${err.message}`);
    return null;
  }
}

async function writeJSON(name, data) {
  const file = path.join(DATA_DIR, name);
  await fs.writeFile(file, JSON.stringify(data, null, 2));
  console.log(`  wrote src/data/${name}`);
}

async function main() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.mkdir(MEDIA_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  // ---------------------------------------------------------------- About
  console.log("Fetching About…");
  const aboutRows = await fetchAll("About");
  const aboutRecord = aboutRows[aboutRows.length - 1];
  const about = {
    siteTitle: aboutRecord?.get("Site Title") ?? "Sam Ticknor",
    bio: aboutRecord?.get("Bio") ?? "",
    showCV: Boolean(aboutRecord?.get("Show CV")),
    bioImage: await firstImage(aboutRecord?.get("Bio Image")),
    splashImage: await firstImage(aboutRecord?.get("Splash Images")),
  };
  await writeJSON("about.json", about);

  // -------------------------------------------------------------- Process
  console.log("Fetching Process…");
  let processPosts = [];
  try {
    const processRows = await fetchAll("Process");
    for (const record of processRows) {
      if (!record.get("Show On Page")) continue;
      const images = [];
      for (const att of record.get("Images") ?? []) {
        const img = await firstImage([att]);
        if (img) images.push(img);
      }
      processPosts.push({
        title: record.get("Title") ?? null,
        date: record.get("Date") ?? null,
        text: record.get("Text") ?? null,
        images,
      });
    }
  } catch (err) {
    console.warn(`  ! could not fetch Process table: ${err.message}`);
  }
  await writeJSON("process.json", processPosts);

  // ------------------------------------------------------------------- CV
  console.log("Fetching CV…");
  const cvRows = await fetchAll("CV");
  const cvCategories = [];
  const cvByCategory = new Map();
  for (const record of cvRows) {
    if (!record.get("Show on CV")) continue;
    const category = record.get("Category")?.[0];
    if (!category) continue;
    const line2 = [record.get("Place"), record.get("City, State"), record.get("Date(s)")]
      .filter(Boolean)
      .join(" · ");
    const entry = {
      line1: record.get("Title") ?? "",
      line2,
      line3: record.get("Subtitle") ?? "",
      line4: record.get("Description") ?? "",
      link: { title: record.get("Link Title") ?? "", url: record.get("Link") ?? "" },
    };
    if (!cvByCategory.has(category)) {
      cvByCategory.set(category, []);
      cvCategories.push(category);
    }
    cvByCategory.get(category).push(entry);
  }
  await writeJSON(
    "cv.json",
    cvCategories.map((category) => ({ category, records: cvByCategory.get(category) })),
  );

  // ---------------------------------------------------------------- Works
  console.log("Fetching Works…");
  const workRows = await fetchAll("Works");
  const works = {};
  const dateCollections = {};
  for (const record of workRows) {
    works[record.id] = {
      image: await firstImage(record.get("Image")),
      videoLink: record.get("Video Link") ?? null,
      title: record.get("Title") ?? null,
      year: record.get("Year") ?? null,
      medium: record.get("Medium") ?? null,
      width: record.get("Width") ?? null,
      height: record.get("Height") ?? null,
      depth: record.get("Depth") ?? null,
      description: record.get("Description") ?? null,
    };
    const date = record.get("Date Collection");
    if (date !== undefined && date !== "") {
      (dateCollections[date] ??= []).push(record.id);
    }
  }
  await writeJSON("works.json", works);
  await writeJSON("dateCollections.json", dateCollections);

  // ---------------------------------------------------- Collections Index
  console.log("Fetching Collections Index…");
  const collectionRows = await fetchAll("Collections Index");
  const collections = [];
  for (const record of collectionRows) {
    const route = record.get("Route");
    if (!route) continue;
    console.log(`  collection table: ${route}`);
    let workIds = [];
    try {
      const rows = await fetchAll(route);
      workIds = rows
        .map((r) => r.get("Work")?.[0])
        .filter((id) => id && works[id]);
    } catch (err) {
      console.warn(`  ! could not fetch collection table "${route}": ${err.message}`);
    }
    collections.push({
      route,
      title: record.get("Title") ?? route,
      showInMenu: Boolean(record.get("Show In Menu")),
      years: record.get("Years") ?? null,
      collectionStatement: record.get("Collection Statement") ?? null,
      workIds,
    });
  }
  await writeJSON("collections.json", collections);

  // -------------------------------------------------- Installations Index
  console.log("Fetching Installations Index…");
  const installationRows = await fetchAll("Installations Index");
  const installations = [];
  for (const record of installationRows) {
    const route = record.get("Route");
    const title = record.get("Title");
    if (!route || !title) continue;
    console.log(`  installation table: ${title}`);
    let modules = [];
    try {
      const rows = await fetchAll(title);
      modules = rows.map((r) => ({
        moduleType: r.get("Module Type") ?? null,
        moduleTitle: r.get("Module Title") ?? null,
        moduleText: r.get("Module Text") ?? null,
        showWorkTitlesWithinModule: Boolean(r.get("Show Work Titles Within Module")),
        workIds: (r.get("Module Work(s)") ?? []).filter((id) => works[id]),
      }));
    } catch (err) {
      console.warn(`  ! could not fetch installation table "${title}": ${err.message}`);
    }
    installations.push({
      route,
      title,
      showInMenu: Boolean(record.get("Show In Menu")),
      link: record.get("Link") ?? null,
      dates: record.get("Dates") ?? null,
      location: record.get("Location") ?? null,
      image: await firstImage(record.get("Image")),
      modules,
    });
  }
  await writeJSON("installations.json", installations);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
