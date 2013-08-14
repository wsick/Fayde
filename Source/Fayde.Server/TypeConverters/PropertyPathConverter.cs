using System;
using Fayde.Data;

namespace Fayde.TypeConverters
{
    public class PropertyPathConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PropertyPath); }
        }

        public object Convert(string from)
        {
            return new PropertyPath() { Path = from };
        }
    }
}