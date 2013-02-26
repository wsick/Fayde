
namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element("Fayde.Shapes")]
    public class Rectangle : Shape
    {
        public static readonly PropertyDescription RadiusXProperty = PropertyDescription.Register("RadiusX", typeof(double), typeof(Rectangle));
        public static readonly PropertyDescription RadiusYProperty = PropertyDescription.Register("RadiusY", typeof(double), typeof(Rectangle));
    }
}