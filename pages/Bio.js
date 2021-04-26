class Bio extends Page {

  constructor(data) {
    super(data);

    this.bioImage = new Image();
    this.bioImage.src = this.data.image;
  }

  render() {
    this.setupPage()

    var bioContainer = $("<span class='bioContainer'>");
    
    if (this.data.text) {
      var text = $("<div class='bioText'>");
      text.html(this.data.text.replace(/\n/g, "<br/>"));
      bioContainer.append(text);
    }

    var bioRow = $("<div class='bioRow'>");

    if (this.data.emailLink) {
      var link = $("<a class='bioLink'>");
      var icon = $("<i class='far fa-fw fa-lg fa-envelope'>");
      link.attr("href", "mailto:" + this.data.emailLink);
      link.append(icon);
      bioRow.append(link);
    }
    if (this.data.instagramLink) {
      var link = $("<a class='bioLink'>");
      var icon = $("<i class='fab fa-fw fa-lg fa-instagram'>");
      link.attr("href", this.data.instagramLink);
      link.attr("target", "_blank");
      link.append(icon);
      bioRow.append(link);
    }
    bioContainer.append(bioRow);

    if (this.data.image) {
      var image = $("<img class='bioImage'>");
      image.attr("src", this.data.image);
      bioContainer.append(image);
    }
   
    $("#page").append(bioContainer);

  }
}
