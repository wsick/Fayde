using System;
using System.Collections.Generic;
using System.Linq;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum, AllowMultiple = false)]
    public sealed class ElementAttribute : Attribute
    {
        private static Dictionary<Type, ElementAttribute> _CachedElementAttributes = new Dictionary<Type, ElementAttribute>();

        public ElementAttribute()
        {
        }

        public ElementAttribute(string nullstoneNamespace)
        {
            NullstoneNamespace = nullstoneNamespace;
        }

        public ElementAttribute(string nullstoneNamespace, string nullstoneName)
        {
            NullstoneName = nullstoneName;
            NullstoneNamespace = nullstoneNamespace;
        }

        private string NullstoneNamespace { get; set; }
        private string NullstoneName { get; set; }
        
        public static string GetFullNullstoneType(Type type, IJsonOutputModifiers outputMods)
        {
            outputMods.AddTypeReference(type);

            var elAttr = GetElementAttribute(type);

            string ns = "";
            if (elAttr == null || elAttr.NullstoneNamespace == null)
                ns = type.Namespace;
            else
                ns = elAttr.NullstoneNamespace;

            string name = "";
            if (elAttr == null || elAttr.NullstoneName == null)
                name = type.Name;
            else
                name = elAttr.NullstoneName;

            if (outputMods.IsNamespaceIncluded && !string.IsNullOrWhiteSpace(ns))
                return string.Format("{0}.{1}", ns, name);
            return name;
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
        
        private static ElementAttribute GetElementAttribute(Type type)
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