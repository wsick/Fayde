using System;

namespace Fayde.TypeConverters
{
    public class DoubleConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            return double.Parse(from);
        }

        public Type ConversionType
        {
            get { return typeof(double); }
        }
    }
}