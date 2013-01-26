
namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element(NullstoneNamespace = "Fayde.Shapes")]
    public class Line : Shape
    {
        public static readonly PropertyDescription X1Property = PropertyDescription.Register("X1", typeof(double), typeof(Line));
        public static readonly PropertyDescription Y1Property = PropertyDescription.Register("Y1", typeof(double), typeof(Line));
        public static readonly PropertyDescription X2Property = PropertyDescription.Register("X2", typeof(double), typeof(Line));
        public static readonly PropertyDescription Y2Property = PropertyDescription.Register("Y2", typeof(double), typeof(Line));
    }
}
