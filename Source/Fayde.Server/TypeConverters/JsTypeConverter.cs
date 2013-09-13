using System;
using Fayde.Primitives;

namespace Fayde.TypeConverters
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