using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class Color : IJsonSerializable
    {
        public static Color FromHex(string hexString)
        {
            return new Color(hexString);
        }

        private string HexString { get; set; }

        private Color(string hexString)
        {
            HexString = hexString;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("Color.FromHex(\"{0}\")", HexString);
        }
    }

    public class ColorTypeConverter: TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            return Color.FromHex(from);
        }
    }
}
