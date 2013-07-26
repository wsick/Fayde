using System;
using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class ColorConverter: ITypeConverter
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
