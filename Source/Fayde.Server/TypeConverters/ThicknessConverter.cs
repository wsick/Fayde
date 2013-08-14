using System;
using System.Linq;
using Fayde.Primitives;

namespace Fayde.TypeConverters
{
    public class ThicknessConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            string[] parts = from.Split(',');
            if (parts.Count() == 1)
            {
                double value = double.Parse(from);
                return new Thickness
                {
                    Left = value,
                    Top = value,
                    Right = value,
                    Bottom = value
                };
            }
            else if (parts.Count() == 2)
            {
                return new Thickness
                {
                    Left = double.Parse(parts[0]),
                    Top = double.Parse(parts[1]),
                    Right = double.Parse(parts[0]),
                    Bottom = double.Parse(parts[1])
                };
            }
            else if (parts.Count() == 4)
            {
                return new Thickness
                {
                    Left = double.Parse(parts[0]),
                    Top = double.Parse(parts[1]),
                    Right = double.Parse(parts[2]),
                    Bottom = double.Parse(parts[3])
                };
            }
            else
                throw new Exception(string.Format("An invalid value has been set for Thickness. {0}", from));
        }

        public Type ConversionType
        {
            get { return typeof(Thickness); }
        }
    }
}