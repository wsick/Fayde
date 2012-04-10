using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
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
