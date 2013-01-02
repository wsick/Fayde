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

        private static IDictionary<string, PropertyDescription> _dependencyProperties = new Dictionary<string, PropertyDescription>();

        public static PropertyDescription Register(string name, Type type, Type ownerType, bool isContent = false)
        {
            string key = string.Format("{0}.{1}", ownerType.Name, name);
            PropertyDescription dp = new PropertyDescription(name, type, isContent);
            if (_dependencyProperties.Keys.Contains(key))
                throw new ArgumentException(string.Format("The DependencyProperty ({0}) has already been registered.", key));
            //TODO: check and make sure more than one content property is not registered
            _dependencyProperties.Add(key, dp);
            return dp;
        }

        public static PropertyDescription Get(string name, Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);

                string key = string.Format("{0}.{1}", checkType.Name, name);
                if (_dependencyProperties.Keys.Contains(key))
                    return _dependencyProperties[key];

                checkType = checkType.BaseType;
            }

            return null;
        }

        public static PropertyDescription GetContent(Type ownerType)
        {
            Type checkType = ownerType;
            while (checkType != null)
            {
                PropertyHelper.EnsurePropertyRegistered(checkType);

                var pd = _dependencyProperties
                    .ToList()
                    .Where(kvp => kvp.Key.StartsWith(checkType.Name + ".") && kvp.Value.IsContent)
                    .Select(kvp => kvp.Value)
                    .FirstOrDefault();
                if (pd != null)
                    return pd;

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
