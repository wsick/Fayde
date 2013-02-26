
namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class Brush : DependencyObject
    {
        public static readonly PropertyDescription TransformProperty = PropertyDescription.Register("Transform", typeof(Transform), typeof(Brush));
    }
}