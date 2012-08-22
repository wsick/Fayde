using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    /*
    <object property="[days.]hours:minutes:seconds[.fractionalSeconds]"/>
    -or-
    <object property="Automatic" .../>
    -or-
    <object property="Forever" .../>
     */

    public class DurationConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            if (from.Equals("Automatic"))
                return Duration.Automatic;
            if (from.Equals("Forever"))
                return Duration.Forever;

            TimeSpanConverter tsc = new TimeSpanConverter();
            return new Duration((Elements.Types.TimeSpan)tsc.Convert(from));
        }

        public Type ConversionType
        {
            get { return typeof(Duration); }
        }
    }
}
