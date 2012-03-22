using System;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class UriConverter : TypeConverterAttribute
    {
        public override object Convert(Elements.DependencyObject element, System.Reflection.PropertyInfo pi, string from)
        {
            return new Uri(from);
        }
    }
}
