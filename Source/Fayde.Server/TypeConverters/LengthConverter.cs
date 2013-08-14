using System;
using Fayde.Primitives;

namespace Fayde.TypeConverters
{
    public class LengthConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Length); }
        }

        public object Convert(string from)
        {
            if (from.ToLower().Equals("auto"))
                return new Length { Value = double.NaN };

            return new Length { Value = double.Parse(from) };
        }
    }
}