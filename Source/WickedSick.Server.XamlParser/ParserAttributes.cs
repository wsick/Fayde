using System;
using System.Linq;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum, AllowMultiple=false)]
    public sealed class ElementAttribute : Attribute
    {
        public ElementAttribute()
        {
        }

        public string NullstoneNamespace { get; set; }
        public string NullstoneName { get; set; }
        
        public static string GetFullNullstoneType(Type type)
        {
            var elAttr = type
                .GetCustomAttributes(typeof(ElementAttribute), false)
                .OfType<ElementAttribute>()
                .FirstOrDefault();
            if (elAttr == null)
                return type.Name;
            if (string.IsNullOrWhiteSpace(elAttr.NullstoneNamespace))
                return elAttr.NullstoneName;
            if (string.IsNullOrWhiteSpace(elAttr.NullstoneName))
                return string.Format("{0}.{1}", elAttr.NullstoneNamespace, type.Name);
            return string.Format("{0}.{1}", elAttr.NullstoneNamespace, elAttr.NullstoneName);
        }
    }
}