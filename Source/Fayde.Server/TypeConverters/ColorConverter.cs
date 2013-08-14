using System;
using Fayde.Primitives;
using Fayde.Media;

namespace Fayde.TypeConverters
{
    public class ColorConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            Color c = null;
            if (!from.StartsWith("#"))
                c = Colors.FindColor(from);
            return c ?? Color.FromHex(from);
        }

        public Type ConversionType
        {
            get { return typeof(Color); }
        }
    }
}