
namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class SkewTransform : Transform
    {
        public static readonly PropertyDescription AngleXProperty = PropertyDescription.Register("AngleX", typeof(double), typeof(SkewTransform));
        public static readonly PropertyDescription AngleYProperty = PropertyDescription.Register("AngleY", typeof(double), typeof(SkewTransform));
    }
}