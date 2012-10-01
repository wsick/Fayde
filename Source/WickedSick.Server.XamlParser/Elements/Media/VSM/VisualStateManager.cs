
namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    public class VisualStateManager : DependencyObject
    {
        public static readonly AttachedPropertyDescription VisualStateGroupsProperty = AttachedPropertyDescription.Register("VisualStateGroups", typeof(DependencyObjectCollection<VisualStateGroup>), typeof(VisualStateManager));
    }
}