using System;
using System.Collections.Generic;

namespace WickedSick.Server.XamlParser
{
    public interface IAttributeDescription
    {
        string Name { get; }
    }

    internal static class AttributeDescriptionHelper
    {
        private static Dictionary<Type, Dictionary<string, IAttributeDescription>> _AttributeDescriptions = new Dictionary<Type, Dictionary<string, IAttributeDescription>>();

        internal static void Register(IAttributeDescription desc, Type ownerType)
        {
            Dictionary<string, IAttributeDescription> attrs;
            if (_AttributeDescriptions.ContainsKey(ownerType))
                attrs = _AttributeDescriptions[ownerType];
            else
                _AttributeDescriptions[ownerType] = attrs = new Dictionary<string, IAttributeDescription>();
            if (attrs.ContainsKey(desc.Name))
                throw new ArgumentException(string.Format("Attribute '{0}.{1}' has been registered.", ownerType.Name, desc.Name));
            attrs[desc.Name] = desc;
        }

        public static IAttributeDescription Get(string name, Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);
                if (_AttributeDescriptions.ContainsKey(checkType))
                {
                    var groupDict = _AttributeDescriptions[checkType];
                    if (groupDict.ContainsKey(name))
                        return groupDict[name];
                }
                checkType = checkType.BaseType;
            }

            return null;
        }
    }
}