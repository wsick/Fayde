
namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class RotateTransform : Transform
    {
        public static readonly PropertyDescription AngleProperty = PropertyDescription.Register("Angle", typeof(double), typeof(RotateTransform));
        public static readonly PropertyDescription CenterXProperty = PropertyDescription.Register("CenterX", typeof(double), typeof(RotateTransform));
        public static readonly PropertyDescription CenterYProperty = PropertyDescription.Register("CenterY", typeof(double), typeof(RotateTransform));
    }
}