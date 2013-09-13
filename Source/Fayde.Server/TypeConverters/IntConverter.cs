using System;

namespace Fayde.TypeConverters
{
    public class IntConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(int); }
        }

        public object Convert(string from)
        {
            return int.Parse(from);
        }
    }
}