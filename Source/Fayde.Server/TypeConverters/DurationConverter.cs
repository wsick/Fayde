using Fayde.Primitives;

namespace Fayde.TypeConverters
{
    /*
    <object property="[days.]hours:minutes:seconds[.fractionalSeconds]"/>
    -or-
    <object property="Automatic" .../>
    -or-
    <object property="Forever" .../>
     */

    public class DurationConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            if (from.Equals("Automatic"))
                return Duration.Automatic;
            if (from.Equals("Forever"))
                return Duration.Forever;

            TimeSpanConverter tsc = new TimeSpanConverter();
            return new Duration((Primitives.TimeSpan)tsc.Convert(from));
        }

        public System.Type ConversionType
        {
            get { return typeof(Duration); }
        }
    }
}