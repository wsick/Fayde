function Surface() {
    this.Children = new Array();
    this.AddChild = function (el) {
        this.Children.push(el);
    };
    this.AttachTo = function (canvas) {
        this.Canvas = canvas;
        this.Context = this.Canvas.getContext("2d");
    };
    this.Render = function (ctx) {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        for (var i = 0; i < this.Children.length; i++) {
            this.Children[i].Render(this.Context);
        }
    };
}
Surface.prototype = new Object();

var MainSurface = new Surface();
function StartEngine()
{
	MainSurface.Render();
	setTimeout("StartEngine()", 1);
}