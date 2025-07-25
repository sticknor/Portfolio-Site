const formatWorkInfoLine = (work) => {
  const height = work.height || undefined;
  const width = work.width || undefined;
  const depth = work.depth || undefined;
  const title = work.title || undefined;
  const medium = work.medium || undefined;
  const year = work.year || undefined;

  var dimensionsString = undefined;
  if (width && height && depth)
    dimensionsString = `${width}" × ${height} × ${depth}"`;
  else if (width && height) dimensionsString = `${width}" × ${height}"`;

  var details = [title, year, medium, dimensionsString];
  details = details.filter((element) => {
    return element !== undefined;
  });
  var detailsLine = [];

  for (var i = 0; i < details.length; i++) {
    if (i === 0) {
      detailsLine.push(
        <div>
          <i>{details[i]}</i>
        </div>
      );
    } else {
      detailsLine.push(<span>{details[i]}</span>);
      if (i !== details.length - 1) {
        detailsLine.push(<span>{" · "} </span>);
      }
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      {detailsLine.map((i) => {
        return i;
      })}
    </div>
  );
};

export { formatWorkInfoLine };
