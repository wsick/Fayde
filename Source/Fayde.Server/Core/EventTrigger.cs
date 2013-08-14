using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    [Element("Fayde")]
    public class EventTrigger : TriggerBase
    {
        public static readonly PropertyDescription ActionsProperty = PropertyDescription.Register("Actions", typeof(DependencyObjectCollection<TriggerAction>), typeof(EventTrigger), true);
        public static readonly PropertyDescription RoutedEventProperty = PropertyDescription.Register("RoutedEvent", typeof(string), typeof(EventTrigger));
    }
}