using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class KeyTimeConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(KeyTime); }
        }

        public object Convert(string from)
        {
            if (from.ToLower().Equals("uniform"))
                return new KeyTime() { Type = KeyTimeType.Uniform };

            TimeSpanConverter tsc = new TimeSpanConverter();
            return new KeyTime()
                {
                    Type = KeyTimeType.TimeSpan,
                    TimeSpan = (Elements.Types.TimeSpan)tsc.Convert(from)
                };
        }
    }
}
