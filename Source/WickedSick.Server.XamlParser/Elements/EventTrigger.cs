using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class EventTrigger: TriggerBase
    {
        public static readonly PropertyDescription RoutedEvent = PropertyDescription.Register("RoutedEvent", typeof(string), typeof(EventTrigger));
        public static readonly PropertyDescription Actions = PropertyDescription.Register("Actions", typeof(DependencyObjectCollection<TriggerAction>), typeof(EventTrigger));
    }
}
