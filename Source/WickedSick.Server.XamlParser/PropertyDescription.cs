using System;
using System.Collections.Generic;

namespace WickedSick.Server.XamlParser
{
    public class PropertyDescription : IAttributeDescription
    {
        private static Dictionary<Type, PropertyDescription> _ContentProperty = new Dictionary<Type, PropertyDescription>();

        public static PropertyDescription Register(string name, Type type, Type ownerType, bool isContent = false, bool isNotSerialized = false)
        {
            var desc = new PropertyDescription(name, type, isContent, isNotSerialized);
            AttributeDescriptionHelper.Register(desc, ownerType);
            if (isContent)
            {
                if (_ContentProperty.ContainsKey(ownerType))
                    throw new ArgumentException(string.Format("There cannot be more than one content property on a DependencyObject ({0}).", ownerType.Name));
                _ContentProperty[ownerType] = desc;
            }

            return desc;
        }

        public static PropertyDescription GetContent(Type ownerType)
        {
            if (_ContentProperty.ContainsKey(ownerType))
                return _ContentProperty[ownerType];

            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);
                if (_ContentProperty.ContainsKey(checkType))
                    return _ContentProperty[checkType];
                checkType = checkType.BaseType;
            }
            return null;
        }

        private PropertyDescription(string name, Type type, bool isContent, bool isNotSerialized)
        {
            Name = name;
            Type = type;
            IsContent = isContent;
            IsNotSerialized = isNotSerialized;
        }

        public string Name { get; private set; }
        public Type Type { get; private set; }
        public bool IsContent { get; private set; }
        public bool IsNotSerialized { get; private set; }
    }
}