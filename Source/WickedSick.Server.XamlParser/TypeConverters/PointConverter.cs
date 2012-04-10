using System;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class PointConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            string[] parts = from.Split(',');
            return new Point()
            {
                X = double.Parse(parts[0].Trim()),
                Y = double.Parse(parts[1].Trim())
            };
        }

        public Type ConversionType
        {
            get { return typeof(Point); }
        }
    }
}