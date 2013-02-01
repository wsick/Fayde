
namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public class TranslateTransform : Transform
    {
        public static readonly PropertyDescription XProperty = PropertyDescription.Register("X", typeof(double), typeof(TranslateTransform));
        public static readonly PropertyDescription YProperty = PropertyDescription.Register("Y", typeof(double), typeof(TranslateTransform));
    }
}