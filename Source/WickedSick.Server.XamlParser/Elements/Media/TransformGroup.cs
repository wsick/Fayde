
namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class TransformGroup : Transform
    {
        public static readonly PropertyDescription ChildrenProperty = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<Transform>), typeof(TransformGroup), true);
    }
}