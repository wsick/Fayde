using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Fayde.Xaml.Metadata
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

        public static void SetProperty(object obj, string propertyName, string value)
        {
            var propertyInfo = obj.GetType().GetProperty(propertyName);
            if (propertyInfo != null)
            {
                var convertedValue = Convert.ChangeType(value, propertyInfo.PropertyType, null);
                propertyInfo.SetValue(obj, convertedValue, null);
            }
            else
            {
                throw new MemberAccessException();
            }
        }
    }
}