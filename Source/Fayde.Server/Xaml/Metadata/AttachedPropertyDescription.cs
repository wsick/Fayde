using System;
using System.Collections.Generic;

namespace Fayde.Xaml.Metadata
{
    public class AttachedPropertyDescription
    {
        private static Dictionary<Type, Dictionary<string, AttachedPropertyDescription>> _AttachedProperties = new Dictionary<Type, Dictionary<string, AttachedPropertyDescription>>();

        public static AttachedPropertyDescription Register(string name, Type type, Type ownerType)
        {
            var groupDict = _AttachedProperties.ContainsKey(ownerType) ? _AttachedProperties[ownerType] : null;
            if (groupDict == null)
                _AttachedProperties[ownerType] = groupDict = new Dictionary<string, AttachedPropertyDescription>();

            if (groupDict.ContainsKey(name))
                throw new ArgumentException(string.Format("The DependencyProperty ({0}.{1}) has already been registered.", ownerType.Name, name));

            var dp = new AttachedPropertyDescription(name, type, ownerType);
            groupDict[name] = dp;
            return dp;
        }

        public static AttachedPropertyDescription Get(string name, Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);
                if (_AttachedProperties.ContainsKey(checkType))
                {
                    var groupDict = _AttachedProperties[checkType];
                    if (groupDict.ContainsKey(name))
                        return groupDict[name];
                }
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
