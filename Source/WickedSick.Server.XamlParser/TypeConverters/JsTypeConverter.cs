using System;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class JsTypeConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(JsType); }
        }

        public object Convert(string from)
        {
            return new JsType(from);
        }
    }
}