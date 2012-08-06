using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public enum GridUnitType
    {
        Auto,
        Pixel,
        Star
    }

    public class GridLength : IJsonConvertible
    {
        public double Value { get; set; }
        public GridUnitType UnitType { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new GridLength({0}, {1}.{2})", Value, UnitType.GetType().Name, UnitType.ToString());
        }
    }
}
