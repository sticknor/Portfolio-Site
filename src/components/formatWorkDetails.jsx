import React from "react";

/** Height × width [× depth] in — art-world order. */
function formatWorkDimensions(work) {
  const height = work.height || undefined;
  const width = work.width || undefined;
  const depth = work.depth || undefined;
  if (height && width && depth) return `${height} × ${width} × ${depth} in`;
  if (height && width) return `${height} × ${width} in`;
  if (height) return `${height} in`;
  if (width) return `${width} in`;
  return undefined;
}

/** Mediums are shown lowercase sitewide (e.g. "acrylic ink on paper"). */
function formatWorkMedium(medium) {
  if (!medium) return undefined;
  return String(medium).toLowerCase();
}

/** Plain-text caption for alt attributes and accessibility. */
function formatWorkAltText(work) {
  const parts = [
    work.title?.trim(),
    work.year,
    formatWorkMedium(work.medium),
    formatWorkDimensions(work),
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "artwork";
}

/**
 * Shared caption: Title · Year · medium · H × W in
 * Title is italic (.title); everything else roman.
 */
function WorkCaption({ work, as: Tag = "div", className = "work__caption" }) {
  const title = work.title?.trim() || undefined;
  const year = work.year || undefined;
  const medium = formatWorkMedium(work.medium);
  const dimensions = formatWorkDimensions(work);
  const rest = [year, medium, dimensions].filter(Boolean);

  if (!title && rest.length === 0) return null;

  return (
    <Tag className={className}>
      {title && <span className="title">{title}</span>}
      {title && rest.length > 0 && " · "}
      {rest.map((part, i) => (
        <React.Fragment key={`${part}-${i}`}>
          {i > 0 && " · "}
          {part}
        </React.Fragment>
      ))}
    </Tag>
  );
}

const formatWorkInfoLine = (work) => <WorkCaption work={work} />;

/** Lightbox caption — same format/rules as grid captions. */
const formatWorkLightboxCaption = (work) => (
  <WorkCaption work={work} className="work__caption workLightboxCaptionText" />
);

// Component form, so Astro templates can render the caption statically.
const WorkInfoLine = ({ work }) => formatWorkInfoLine(work);

export {
  formatWorkAltText,
  formatWorkInfoLine,
  formatWorkLightboxCaption,
  WorkCaption,
  WorkInfoLine,
};
