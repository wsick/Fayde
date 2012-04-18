using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class LengthConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Length); }
        }

        public object Convert(string from)
        {
            if (from.ToLower().Equals("auto"))
                return new Length() { Value = double.NaN };

            return new Length() { Value = double.Parse(from) };
        }
    }
}
