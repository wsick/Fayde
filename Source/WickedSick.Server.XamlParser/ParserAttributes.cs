using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false)]
    public sealed class ElementAttribute : Attribute
    {
        private string _elementName;

        public ElementAttribute()
        {
        }

        public ElementAttribute(string elementName)
        {
            _elementName = elementName;
        }

        public string ElementName { get { return _elementName; } }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public sealed class PropertyAttribute : Attribute
    {
        private string _propertyName;

        public PropertyAttribute()
        {
        }

        public PropertyAttribute(string propertyName)
        {
            _propertyName = propertyName;
        }

        public string PropertyName { get { return _propertyName; } }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public sealed class ContentAttribute : Attribute
    {
        private string _elementName;

        public ContentAttribute()
        {
        }

        public ContentAttribute(string elementName)
        {
            _elementName = elementName;
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public abstract class TypeConverterAttribute : Attribute
    {
        public abstract object Convert(string from);
    }
}
