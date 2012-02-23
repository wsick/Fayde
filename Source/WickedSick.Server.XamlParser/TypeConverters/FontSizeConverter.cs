using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class FontSize : IJsonSerializable
    {
        private int _size;

        public FontSize(int size)
        {
            _size = size;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("\"{0}px\"", _size);
        }
    }

    public class FontSizeConverter : TypeConverterAttribute
    {
        public override object Convert(DependencyObject element, PropertyInfo pi, string from)
        {
            return new FontSize(int.Parse(from));
        }
    }
}
