using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Color : IJsonConvertible
    {
        public static Color FromHex(string hexString)
        {
            return new Color() { HexString = hexString };
        }

        public static Color FromUInt32(UInt32 uint32)
        {
            return new Color() { HexString = string.Format("#{0:x8}", uint32).ToUpper() };
        }

        private string HexString { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("Color.FromHex(\"{0}\")", HexString);
        }
    }
}
