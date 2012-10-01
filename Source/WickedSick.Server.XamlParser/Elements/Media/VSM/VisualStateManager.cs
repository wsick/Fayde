
namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    public class VisualStateManager : DependencyObject
    {
        static VisualStateManager() { }
        public static readonly AttachedPropertyDescription VisualStateGroups = AttachedPropertyDescription.Register("VisualStateGroups", typeof(DependencyObjectCollection<VisualStateGroup>), typeof(VisualStateManager));
    }
}