using System;
using Fayde.Primitives;

namespace Fayde.TypeConverters
{
    public class FontFamilyConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(FontFamily); }
        }

        public object Convert(string from)
        {
            return new FontFamily
            {
                FamilyNames = from,
            };
        }
    }
}