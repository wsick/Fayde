
namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    [Element(NullstoneNamespace = "Fayde.Media.VisualStateManager")]
    public class VisualStateGroup : DependencyObject
    {
        public static readonly PropertyDescription VisualStates = PropertyDescription.Register("VisualStates", typeof(DependencyObjectCollection<VisualState>), typeof(VisualStateGroup), true);
        public static readonly PropertyDescription TransitionsProperty = PropertyDescription.Register("Transitions", typeof(DependencyObjectCollection<VisualTransition>), typeof(VisualStateGroup));
    }
}