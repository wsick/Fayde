
namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public class Brush : DependencyObject
    {
        public static readonly PropertyDescription TransformProperty = PropertyDescription.Register("Transform", typeof(Transform), typeof(Brush));
    }
}