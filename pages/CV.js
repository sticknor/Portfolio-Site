class CV extends Page {

  constructor(data) {
    super(data);
  }

  renderRow(rowData) {

    var entry = $("<div class='entryCV'>");

    if (rowData.get("Title")) {
      var title = $("<span class='titleCV'>");
      title.html(rowData.get("Title"));
    }

    if (rowData.get("Place")) {
      var place = $("<span class='preDot placeCV'>");
      place.html(rowData.get("Place"));
    }

    if (rowData.get("City, State")) {
      var location = $("<span class='preDot locationCV'>");
      location.html(rowData.get("City, State"));
    }

    if (rowData.get("Date(s)")) {
      var date = $("<span class='preDot dateCV'>");
      date.html(rowData.get("Date(s)"));
    }

    if (rowData.get("Subtitle")) {
      var subtitle = $("<div class='subtitleCV'>");
      subtitle.html(rowData.get("Subtitle"));
    }

    if (rowData.get("Description")) {
      var description = $("<div class='descriptionCV'>");
      description.html(rowData.get("Description").replace(/\n/g, "<br/>"));
    }

    if (rowData.get("Link")) {
      var link = $("<a class='linkCV'>");
      link.attr("href", rowData.get("Link"));
      link.attr("target", "_blank");
      if (rowData.get("Link Title")) {
        link.html(rowData.get("Link Title") + "&rarr;");
      } else {
        link.html("&#128279;");
      }
      var linkContainer = $("<div>");
      linkContainer.append(link);
    }

    entry.append(title);
    entry.append(place);
    entry.append(location);
    entry.append(date);

    entry.append(subtitle);
    entry.append(description);
    entry.append(linkContainer);

    var category = (rowData.get("Category"))[0].split(" ").join("");
    var sortedContainer = $("#about"+category);
    sortedContainer.append(entry);
  }

  render() {
  	this.setupPage()

    var rows = this.data.rows;

    var cvContainer = $("<div class='cvContainer'>");

  	for (var index in rows) {

  		var row = rows[index];

      // CV entry basic requirements are Category and Title
      if (row.get("Category")[0] === undefined) continue;
      if (row.get("Title") === undefined) continue;

  		// Add header if its missing
  		var container;
      var category = (row.get("Category")[0]).split(" ").join("");

  		if ($("#about"+category).length) {
  			container = $("#about"+category)
  		} else {
  			container = $("<div>");
  			container.attr("id", "about"+category);
  			var containerHeading = $("<div>");
  			containerHeading.html(row.get("Category")[0]);
        if (category) {
          containerHeading.addClass("cvContainerHeading");
        }
  			container.append(containerHeading);
  			cvContainer.append(container);
  		} 

      $("#page").append(cvContainer);
      this.renderRow(row);
  	}
  }
}
