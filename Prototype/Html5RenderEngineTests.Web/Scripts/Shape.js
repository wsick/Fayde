function Shape() {
    this.Render = function (ctx) { };
}
Shape.prototype = new Object();

function Rectangle() {
	this.Left = 0;
	this.Top = 0;
	this.Width = 0,
	this.Height = 0;
	this.Background = "#000000";
    this.Render = function (ctx) {
        ctx.fillStyle = this.Background;
        ctx.fillRect(this.Left, this.Top, this.Width, this.Height);
    };
}
Rectangle.prototype = new Shape();

function Circle() {
    this.Left = 0;
    this.Top = 0;
	this.Radius = 0;
	this.Background = "#000000";
	this.Render = function(ctx)
	{
	    ctx.fillStyle = this.Background;
		ctx.beginPath();
		ctx.arc(this.Left, this.Top, this.Radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	};
}
Circle.prototype = new Shape();