using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.Elements;

namespace Parser.TypeConverters
{
    public enum GridUnitType
    {
        Auto,
        Pixel,
        Star
    }

    public class GridLength: IJsonSerializable
    {
        public double Value { get; set; }
        public GridUnitType UnitType { get; set; }

        public string toJson(int tabIndents)
        {
            throw new NotImplementedException();
        }
    }

    public class GridLengthConverterAttribute: TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            if (from.EndsWith("*"))
            {
                return new GridLength()
                {
                    UnitType = GridUnitType.Star,
                    Value = double.Parse(from.Substring(0, from.Length - 1))
                };
            }
            else if (from.Equals("Auto"))
            {
                return new GridLength()
                {
                    UnitType = GridUnitType.Auto
                };
            }
            else
            {
                return new GridLength()
                {
                    UnitType = GridUnitType.Pixel,
                    Value = double.Parse(from)
                };
            }
        }
    }
}
