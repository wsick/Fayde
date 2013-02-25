using System;
using System.Collections.Generic;

namespace WickedSick.Server.XamlParser
{
    public class EventDescription : IAttributeDescription
    {
        private static Dictionary<Type, Dictionary<string, EventDescription>> _Events = new Dictionary<Type, Dictionary<string, EventDescription>>();

        public static EventDescription Register(string name, Type ownerType)
        {
            var desc = new EventDescription(name);
            AttributeDescriptionHelper.Register(desc, ownerType);
            return desc;
        }

        protected EventDescription(string name)
        {
            Name = name;
        }

        public string Name { get; protected set; }
    }
}