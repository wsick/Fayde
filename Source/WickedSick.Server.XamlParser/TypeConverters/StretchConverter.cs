using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    internal enum StretchEnum
    {
        Fill,
        None,
        Uniform,
        UniformToFill,
    }

    public class Stretch : IJsonSerializable
    {
        private StretchEnum _Stretch;

        internal Stretch(StretchEnum stretch)
        {
            _Stretch = stretch;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", GetType().Name, _Stretch.ToString());
        }
    }

    public class StretchConverter : TypeConverterAttribute
    {
        public override object Convert(DependencyObject element, System.Reflection.PropertyInfo pi, string from)
        {
            return new Stretch((StretchEnum)Enum.Parse(typeof(StretchEnum), from));
        }
    }
}
