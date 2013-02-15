using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using System.Reflection;

namespace WickedSick.Server.XamlParser
{
    public class PropertyDescription
    {
        static readonly ILog Log = LogManager.GetLogger(typeof(PropertyDescription));

        private static Dictionary<Type, PropertyDescription> _ContentProperty = new Dictionary<Type, PropertyDescription>();
        private static Dictionary<Type, Dictionary<string, PropertyDescription>> _GroupedDependencyProperties = new Dictionary<Type, Dictionary<string, PropertyDescription>>();

        public static PropertyDescription Register(string name, Type type, Type ownerType, bool isContent = false)
        {
            var groupDict = _GroupedDependencyProperties.ContainsKey(ownerType) ? _GroupedDependencyProperties[ownerType] : null;
            if (groupDict == null)
                _GroupedDependencyProperties[ownerType] = groupDict = new Dictionary<string, PropertyDescription>();

            if (groupDict.ContainsKey(name))
                throw new ArgumentException(string.Format("The DependencyProperty ({0}.{1}) has already been registered.", ownerType.Name, name));

            if (isContent && _ContentProperty.ContainsKey(ownerType))
                throw new ArgumentException(string.Format("There cannot be more than one content property on a DependencyObject ({0})", ownerType.Name));

            var dp = new PropertyDescription(name, type, isContent);
            groupDict[name] = dp;
            if (isContent)
                _ContentProperty[ownerType] = dp;
            return dp;
        }

        public static PropertyDescription Get(string name, Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);
                var groupDict = _GroupedDependencyProperties.ContainsKey(checkType) ? _GroupedDependencyProperties[checkType] : null;
                if (groupDict != null)
                {
                    if (groupDict.ContainsKey(name))
                        return groupDict[name];
                }

                checkType = checkType.BaseType;
            }

            return null;
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

        private PropertyDescription(string name, Type type, bool isContent)
        {
            Name = name;
            Type = type;
            IsContent = isContent;
        }

        public string Name { get; private set; }
        public Type Type { get; private set; }
        public bool IsContent { get; private set; }
    }
}