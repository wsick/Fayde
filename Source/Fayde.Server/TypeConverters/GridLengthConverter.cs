using System;
using Fayde.Controls;

namespace Fayde.TypeConverters
{
    public class GridLengthConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            if (from.EndsWith("*"))
            {
                var gl = new GridLength
                {
                    UnitType = GridUnitType.Star
                };
                if (from.Length > 1)
                    gl.Value = double.Parse(from.Substring(0, from.Length - 1));
                else
                    gl.Value = 1;
                return gl;
            }
            else if (from.Equals("Auto"))
            {
                return new GridLength
                {
                    UnitType = GridUnitType.Auto,
                    Value = 1
                };
            }
            else
            {
                return new GridLength
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