using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum PageLengthType
    {
        Pixel,
        Percentage
    }

    public class PageLength: IJsonSerializable
    {
        public double Value { get; set; }
        public PageLengthType LengthType { get; set; }

        public string toJson(int tabIndents)
        {
            if (LengthType == PageLengthType.Pixel)
                return Value.ToString();
            else
                return string.Format("{0}%", Value);
        }
    }

    public class PageLengthConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PageLength); }
        }

        public object Convert(string from)
        {
            PageLength pl = new PageLength();
            if (from.EndsWith("%"))
            {
                pl.LengthType = PageLengthType.Percentage;
                pl.Value = double.Parse(from.Substring(0, from.Length - 1));
            }
            else
            {
                pl.LengthType = PageLengthType.Pixel;
                pl.Value = double.Parse(from);
            }
            return pl;
        }
    }
}
