using System;
using System.Linq;
using System.Reflection;

namespace WickedSick.Server.XamlParser
{
    public static class PropertyHelper
    {
        public static void EnsurePropertyRegistered(Type type)
        {
            type.GetMembers(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public)
                .Concat(type.GetMembers(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic))
                .OfType<FieldInfo>().Where(fi => fi.FieldType == typeof(PropertyDescription) || fi.FieldType == typeof(AttachedPropertyDescription)).ToList()
                .ForEach(fi => fi.GetValue(null));
        }
    }
}