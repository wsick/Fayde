using System;
using Fayde.Primitives;

namespace Fayde.TypeConverters
{
    public class KeyTimeConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(KeyTime); }
        }

        public object Convert(string from)
        {
            if (from.ToLower().Equals("uniform"))
                return new KeyTime { Type = KeyTimeType.Uniform };

            var tsc = new TimeSpanConverter();
            return new KeyTime
            {
                Type = KeyTimeType.TimeSpan,
                TimeSpan = (Primitives.TimeSpan)tsc.Convert(from)
            };
        }
    }
}