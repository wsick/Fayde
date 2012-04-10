using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class ThicknessConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            string[] parts = from.Split(',');
            if (parts.Count() == 1)
            {
                double value = double.Parse(from);
                return new Thickness()
                {
                    Left = value,
                    Top = value,
                    Right = value,
                    Bottom = value
                };
            }
            else if (parts.Count() == 2)
            {
                return new Thickness()
                {
                    Left = double.Parse(parts[0]),
                    Top = double.Parse(parts[1]),
                    Right = double.Parse(parts[0]),
                    Bottom = double.Parse(parts[1])
                };
            }
            else if (parts.Count() == 4)
            {
                return new Thickness()
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
