
namespace WickedSick.Server.XamlParser.Elements
{
    public class EventTrigger : TriggerBase
    {
        public static readonly PropertyDescription Actions = PropertyDescription.Register("Actions", typeof(DependencyObjectCollection<TriggerAction>), typeof(EventTrigger), true);
        public static readonly PropertyDescription RoutedEvent = PropertyDescription.Register("RoutedEvent", typeof(string), typeof(EventTrigger));
    }
}
