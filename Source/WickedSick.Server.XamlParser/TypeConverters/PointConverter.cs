using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class Point: IJsonSerializable
    {
        public double X { get; set; }
        public double Y { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new Point({0}, {1})", X, Y);
        }
    }
    
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