
namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class ControlTemplate: DependencyObject
    {
        [Property]
        public string TargetType { get; set; }

        [Content]
        public UIElement Content { get; set; }
    }
}
