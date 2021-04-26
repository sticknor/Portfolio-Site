
class Scroll extends Page {

  constructor(data) {
    super(data);
    this.isThumbnailView = this.data.rows.length > 1 ? true : false;
    this.index = 0;
    this.largestWidth;

    // preload images
    this.images = new Array();
    for (var i=0; i < this.data.rows.length; i++) {
      if (this.data.rows[i].get("Work")) {
        var workType = this.data.rows[i].get("Work")[0].type.split("/")[0];
        if (workType === "image") {
          this.images[i] = new Image();
          this.images[i].src = this.data.rows[i].get("Work")[0].thumbnails.full.url;
        }
      }
    }
  }

  renderScrollView() {
    var grid = $("<div>");
    grid.attr("id", "grid");
    $("#page").append(grid);

    var rows = this.data.rows;
    for (var i in rows) {
      var work = rows[i];
      var gridItem = $(`<div id='gridItem${i}'>`);
      gridItem.addClass("gridItem");

      var width = work.get("Width") ? parseInt(work.get("Width")) : 0;
      this.largestWidth = Math.max(width, this.largestWidth || 0);

      var image = $(`<img class='gridImage'>`);
      image.attr("src", work.get("Work")[0].thumbnails.full.url);
      gridItem.append(image);

      if (work.get("Title")) {
        var title = $("<span>");
        title.html(work.get("Title"));
        title.addClass("imageTitle");
        $(gridItem).append(title);
      }

      var dimensionsString = undefined;
      if (work.get("Width") && work.get("Height")) dimensionsString = `${work.get("Width")}" &times; ${work.get("Height")}"`;
      var detailsString = makeDetailsLine([work.get("Year"), work.get("Medium"), dimensionsString]);
      if (detailsString !== "") {
        var details = $("<span>");
        details.html(detailsString);
        details.addClass("imageDetails");
        $(gridItem).append(details);
      }

      $("#grid").append(gridItem);
    }
  }

  sizeImages() {
    for (var i in this.data.rows) {
        const sizeSteps = [45, 60, 80, 100, 100];
        var item = $(`#gridItem${i}`);
        var work = this.data.rows[i];
        var displaySize = work.get("Display Size");
        var width = work.get("Width");
        var widthPercentage;

        if (displaySize === "Small")  widthPercentage = sizeSteps[0];
        else if (displaySize === "Medium")  widthPercentage = sizeSteps[1];
        else if (displaySize === "Large")  widthPercentage = sizeSteps[2];
        else if (displaySize === "Xlarge")  widthPercentage = sizeSteps[3];
        else {
            widthPercentage = width ? (width / this.largestWidth) * 100 : 100;
            for (var i = 0; i < sizeSteps.length - 1; i++) {
                if (widthPercentage > sizeSteps[i] && widthPercentage <= sizeSteps[i+1]) {
                    widthPercentage = sizeSteps[i+1];
                }
            }
        }
        item.css('width', `${widthPercentage}%`);
    }
  }

  render() {
    this.setupPage();
    this.renderScrollView();
    this.sizeImages();
  }
}