using System;

namespace Fayde.TypeConverters
{
    public class BooleanConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Core.Boolean); }
        }

        public object Convert(string from)
        {
            var b = new Core.Boolean();
            b.Content = from;
            return b;
        }
    }
}