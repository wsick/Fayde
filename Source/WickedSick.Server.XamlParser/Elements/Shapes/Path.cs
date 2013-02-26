using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element("Fayde.Shapes")]
    public class Path : Shape
    {
        public static readonly PropertyDescription DataProperty = PropertyDescription.Register("Data", typeof(Geometry), typeof(Path));
    }
}