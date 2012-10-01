using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser
{
    public class AttachedPropertyDescription
    {
        private static IDictionary<string, AttachedPropertyDescription> _attachedProperties = new Dictionary<string, AttachedPropertyDescription>();

        public static AttachedPropertyDescription Register(string name, Type type, Type ownerType)
        {
            string key = string.Format("{0}.{1}", ownerType.Name, name);
            AttachedPropertyDescription pd = new AttachedPropertyDescription(name, type, ownerType);
            if (_attachedProperties.ContainsKey(key))
                throw new ArgumentException(string.Format("The AttachedProperty ({0}) has already been registered."));
            //TODO: check and make sure more than one content property is not registered
            _attachedProperties.Add(key, pd);
            return pd;
        }

        public static AttachedPropertyDescription Get(string name, Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);

                string key = string.Format("{0}.{1}", checkType.Name, name);
                if (_attachedProperties.Keys.Contains(key))
                    return _attachedProperties[key];
                checkType = checkType.BaseType;
            }

            return null;
        }

        private AttachedPropertyDescription(string name, Type type, Type ownerType)
        {
            Name = name;
            Type = type;
            OwnerType = ownerType;
        }

        public string Name { get; private set; }
        public Type Type { get; private set; }
        public Type OwnerType { get; private set; }
    }
}
