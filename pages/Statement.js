class Statement extends Page {

  constructor(data) {
    super(data);
  }
 
  render() {
    this.setupPage();

    var container = $("<div class='statementContainer'>")
    
    var text = $("<div class='statementText'>");
    text.html(this.data.text.replace(/\n/g, "<br/>"));

    container.append(text)
    $("#page").append(container);
  }
}
