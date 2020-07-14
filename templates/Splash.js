class Splash extends Page {

  constructor(data) {
    super(data);
    this.index = 0;

    // preload images
    this.images = new Array();
	for (var i=0; i < this.data.rows.length; i++) {
		var workType = this.data.rows[i].type.split("/")[0];
		console.log(workType)
		if (workType === "image") {
			this.images[i] = new Image();
			this.images[i].src = this.data.rows[i].thumbnails.full.url;
		}
	}
  }

  render() {
    this.setupPage()

    var splashContainer = $("<div id='splashContainer'>");

    // Intial Image
    splashContainer.css("background-image", "url(" + this.data.rows[this.index].thumbnails.full.url + ")");

    // Interval to change image
    localStorage.setItem('splashInterval', window.setInterval(() => {
    	this.index < this.images.length - 1 ? this.index++ : this.index = 0;
    	console.log(this.index);
    	splashContainer.css("background-image", "url(" + this.images[this.index].src + ")");
    }, 5000));

    $("body").append(splashContainer);
  }
}
