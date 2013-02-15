using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace WickedSick.Server.XamlParser
{
    public static class PropertyHelper
    {
        private static List<Type> _TypeRegistered = new List<Type>();

        public static void EnsurePropertyRegistered(Type type)
        {
            if (_TypeRegistered.Contains(type))
                return;
            type.GetMembers(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public)
                .Concat(type.GetMembers(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic))
                .OfType<FieldInfo>().Where(fi => fi.FieldType == typeof(PropertyDescription) || fi.FieldType == typeof(AttachedPropertyDescription)).ToList()
                .ForEach(fi => fi.GetValue(null));
            _TypeRegistered.Add(type);
        }
    }
}