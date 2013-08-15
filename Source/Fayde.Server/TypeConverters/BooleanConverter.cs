using System;

namespace Fayde.TypeConverters
{
    public class BoolConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(bool); }
        }

        public object Convert(string from)
        {
            return bool.Parse(from);
        }
    }

    public class BooleanConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Core.Boolean); }
        }

        public object Convert(string from)
        {
            return new Core.Boolean { Content = from };
        }
    }
}