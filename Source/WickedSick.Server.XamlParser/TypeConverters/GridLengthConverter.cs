using System;
using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class GridLengthConverter : ITypeConverter
    {
        public object Convert(string from)
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

        public Type ConversionType
        {
            get { return typeof(GridLength); }
        }
    }
}
