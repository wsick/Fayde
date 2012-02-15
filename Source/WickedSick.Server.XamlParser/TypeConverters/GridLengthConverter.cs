using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum GridUnitType
    {
        Auto,
        Pixel,
        Star
    }

    public class GridLength : IJsonSerializable
    {
        public double Value { get; set; }
        public GridUnitType UnitType { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new GridLength({0}, {1}.{2})", Value, UnitType.GetType().Name, UnitType.ToString());
        }
    }

    public class GridLengthConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            if (from.EndsWith("*"))
            {
                GridLength gl = new GridLength();
                gl.UnitType = GridUnitType.Star;
                if (from.Length > 1)
                    gl.Value = double.Parse(from.Substring(0, from.Length - 1));
                else
                    gl.Value = 1;
                return gl;
            }
            else if (from.Equals("Auto"))
            {
                return new GridLength()
                {
                    UnitType = GridUnitType.Auto,
                    Value = 1
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
