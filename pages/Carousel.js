
class Carousel extends Page {

  constructor(data) {
    super(data);
    this.isThumbnailView = this.data.rows.length > 1 ? true : false;
    this.index = 0;

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

  renderMobileView() {
    var grid = $("<div>");
    grid.attr("id", "grid");
    $("#page").append(grid);

    var rows = this.data.rows;
    for (var i in rows) {
      var work = rows[i];
      var gridItem = $("<div>");
      gridItem.addClass("gridItem");

      var image = $("<img class='gridImage'>");
      image.attr("src", work.get("Work")[0].thumbnails.full.url);
      gridItem.append(image);
      
      var imageDetails = $("<div>");
      if (work.get("Title") !== undefined) {
        var title = $("<div>");
        title.html(work.get("Title"));
        title.addClass("imageTitle");
        imageDetails.append(title);
      }
      var detailsString = makeDetailsLine([work.get("Medium"), work.get("Dimensions"), work.get("Year")]);
      if (detailsString !== "") {
        var details = $("<div>");
        details.html(detailsString);
        details.addClass("imageDetails");
        imageDetails.append(details);
      }

      if (work.get("Description") !== undefined) {
        var description = $("<div>");
        description.html(work.get("Description"));
        description.addClass("imageDescription");
        imageDetails.append(description);
      }

      $(gridItem).append(imageDetails);

      $("#grid").append(gridItem);
    }
  }

  renderThumbnailView() {

    var grid = $("<div>");
    grid.attr("id", "grid");
    $("#page").append(grid);

    var rows = this.data.rows;
    for (var i in rows) {
      var work = rows[i];
      var gridItem = $("<div>");
      gridItem.addClass("gridItem");

      var image = $("<img>");
      image.attr("src", work.get("Work")[0].thumbnails.full.url);
      image.addClass("gridImage");

      var thumbnailClick = function (event) { 
        this.setIndex(event.data.i); 
      }
      
      image.load(function() {
        console.log("Image loaded")
        magicGrid.positionItems();
      });
      image.on("click", {i}, thumbnailClick.bind(this));

      gridItem.append(image);
      
      $("#grid").append(gridItem);
    }

    let magicGrid = new MagicGrid({
      container: "#grid", // Required. Can be a class, id, or an HTMLElement.
      static: true, // Required for static content.
      animate: false, // Optional.
      gutter: 30,
    });
    magicGrid.listen();
    magicGrid.positionItems();
      
    $("#page").append(grid);
  }

  renderCarouselView() {
    $("#carouselControlsContainer").remove();

    var carouselControlsContainer = $("<div>");
    carouselControlsContainer.attr("id", "carouselControlsContainer");

    var work = this.data.rows[this.index];

    var workType = work.get("Work")[0].type.split("/")[0];

    if (workType === "image") {
      var image = $("<img class='fullImage'>");
      image.attr("src", work.get("Work")[0].thumbnails.full.url);
      image.on("click", this.nextIndex.bind(this));
      $("#page").append(image);
    } else if (workType === "video") {
      console.log(workType);
    }

    var imageDetails = $("<div>");
    imageDetails.addClass("imageDetailsContainer");

    if (work.get("Title") !== undefined) {
      var title = $("<div>");
      title.html(work.get("Title"));
      title.addClass("imageTitle");
      imageDetails.append(title);
    }

    var detailsString = makeDetailsLine([work.get("Medium"), work.get("Dimensions"), work.get("Year")]);
    if (detailsString !== "") {
      var details = $("<div>");
      details.html(detailsString);
      details.addClass("imageDetails");
      imageDetails.append(details);
    }

    if (work.get("Description") !== undefined) {
      var description = $("<div>");
      description.html(work.get("Description"));
      description.addClass("imageDescription");
      imageDetails.append(description);
    }

    var carouselIndexDisplay = $("<div>");
      carouselIndexDisplay.attr("id", "carouselIndexDisplay");
      carouselIndexDisplay.html((parseInt(this.index)+1)+" of "+parseInt(this.data.rows.length));
    var carouselControls = $("<div>");
      carouselControls.attr("id", "carouselControls");
    var carouselControlsPrev = $("<div>");
      carouselControlsPrev.html("&#171;");
      carouselControlsPrev.attr("id", "carouselControlPrev")
      carouselControlsPrev.on("click", this.prevIndex.bind(this));
    var carouselControlsNext = $("<div>");
      carouselControlsNext.html("&#187;");
      carouselControlsNext.attr("id", "carouselControlNext")
      carouselControlsNext.on("click", this.nextIndex.bind(this));
    var carouselControlsShowThumbnails = $("<div>");
      carouselControlsShowThumbnails.html("Show All");
      carouselControlsShowThumbnails.attr("id", "carouselControlShowThumbnails");
      carouselControlsShowThumbnails.on("click", this.showThumbnails.bind(this));
      carouselControls.append(carouselControlsPrev);
      carouselControls.append(carouselIndexDisplay);
      carouselControls.append(carouselControlsNext);
    
    if ($(imageDetails).html() !== "") carouselControlsContainer.append(imageDetails);

    var rows = this.data.rows;
    if (rows.length > 1) {
      carouselControlsContainer.append(carouselControls);
      carouselControlsContainer.append(carouselControlsShowThumbnails);
    }

    $("#menuContainer").append(carouselControlsContainer);
  }

  showThumbnails() {
    this.isThumbnailView = true;
    this.render();
  }

  prevIndex() {
    if (this.index === 0) {
      this.setIndex(this.data.rows.length - 1)
    } else {
      this.setIndex(this.index - 1);
    }
  }

  nextIndex() {
    this.setIndex((this.index + 1) % this.data.rows.length);
  }

  setIndex(index) {
    this.index = parseInt(index);
    this.isThumbnailView = false;
    this.render()
  }

  checkKey(e) {
    if (!this.isThumbnailView) {
      if (e.keyCode === 37) { this.prevIndex() }
      else if (e.keyCode === 39) { this.nextIndex() }
    }
  }

  render() {
    this.setupPage();

    // unsubscribe all handlers
    $(document).off("keydown");
    $(document).on("keydown", this.checkKey.bind(this));

    if (window.innerWidth <= 1100) {
      this.renderMobileView();
    } else if (this.isThumbnailView) {
      this.renderThumbnailView();
    } else {
      this.renderCarouselView();
    }
  }
}