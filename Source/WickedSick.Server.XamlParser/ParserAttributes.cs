using System;
using System.Collections.Generic;
using System.Linq;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum, AllowMultiple = false)]
    public sealed class ElementAttribute : Attribute
    {
        public ElementAttribute()
        {
        }

        protected static Dictionary<Type, ElementAttribute> _CachedElementAttributes = new Dictionary<Type, ElementAttribute>();

        public string NullstoneNamespace { get; set; }
        public string NullstoneName { get; set; }

        public static string GetFullNullstoneType(Type type, IJsonOutputModifiers outputMods)
        {
            outputMods.AddTypeReference(type);
            var elAttr = GetElementAttribute(type);
            if (elAttr == null)
                return type.Name;
            if (string.IsNullOrWhiteSpace(elAttr.NullstoneNamespace))
                return elAttr.NullstoneName;
            if (outputMods.IsNamespaceIncluded)
            {
                if (string.IsNullOrWhiteSpace(elAttr.NullstoneName))
                    return string.Format("{0}.{1}", elAttr.NullstoneNamespace, type.Name);
                return string.Format("{0}.{1}", elAttr.NullstoneNamespace, elAttr.NullstoneName);
            }
            else
            {
                if (string.IsNullOrWhiteSpace(elAttr.NullstoneName))
                    return type.Name;
                return elAttr.NullstoneName;
            }
        }
        
        public static string CreateNullstoneTypeDeclaration(Type type)
        {
            var elAttr = type
                .GetCustomAttributes(typeof(ElementAttribute), false)
                .OfType<ElementAttribute>()
                .FirstOrDefault();
            if (elAttr == null)
                return null;
            if (string.IsNullOrWhiteSpace(elAttr.NullstoneNamespace))
                return null;

            var basicTypeName = type.Name;
            if (!string.IsNullOrWhiteSpace(elAttr.NullstoneName))
                basicTypeName = elAttr.NullstoneName;
            var full = string.Format("{0}.{1}", elAttr.NullstoneNamespace, basicTypeName);

            return string.Format("var {0} = {1};", basicTypeName, full);
        }

        protected static ElementAttribute GetElementAttribute(Type type)
        {
            if (_CachedElementAttributes.ContainsKey(type))
                return _CachedElementAttributes[type];
            var elAttr = type
                .GetCustomAttributes(typeof(ElementAttribute), false)
                .OfType<ElementAttribute>()
                .FirstOrDefault();
            _CachedElementAttributes[type] = elAttr;
            return elAttr;
        }
    }
}