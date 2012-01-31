using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.Elements;

namespace Parser.TypeConverters
{
    public class CornerRadius : IJsonSerializable
    {
        public double Left { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new CornerRadius({0}, {1}, {2}, {3})", Left, Top, Right, Bottom);
        }
    }

    public class CornerRadiusConverter : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            string[] parts = from.Split(' ');
            if (parts.Count() == 1)
            {
                double value = double.Parse(from);
                return new CornerRadius()
                {
                    Left = value,
                    Top = value,
                    Right = value,
                    Bottom = value
                };
            }
            else if (parts.Count() == 4)
            {
                return new CornerRadius()
                {
                    Left = double.Parse(parts[0]),
                    Top = double.Parse(parts[1]),
                    Right = double.Parse(parts[2]),
                    Bottom = double.Parse(parts[3])
                };
            }
            else
                throw new Exception(string.Format("An invalid value has been set for CornerRadius. {0}", from));
        }
    }
}
