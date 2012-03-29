using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class BrushConverter : ITypeConverter
    {
        internal string MatchColor(string colorString, out bool isKnownColor, out bool isNumericColor, out bool isContextColor, out bool isScRgbColor)
        {
            string str = colorString.Trim();
            if ((((str.Length == 4) || (str.Length == 5)) || ((str.Length == 7) || (str.Length == 9))) && (str[0] == '#'))
            {
                isNumericColor = true;
                isScRgbColor = false;
                isKnownColor = false;
                isContextColor = false;
                return str;
            }
            isNumericColor = false;
            if (str.StartsWith("sc#", StringComparison.Ordinal))
            {
                isNumericColor = false;
                isScRgbColor = true;
                isKnownColor = false;
                isContextColor = false;
            }
            else
            {
                isScRgbColor = false;
            }
            if (str.StartsWith("ContextColor ", StringComparison.OrdinalIgnoreCase))
            {
                isContextColor = true;
                isScRgbColor = false;
                isKnownColor = false;
                return str;
            }
            isContextColor = false;
            isKnownColor = true;
            return str;
        }

        public object Convert(string from)
        {
            bool flag;
            bool flag2;
            bool flag3;
            bool flag4;
            string trimmedColor = MatchColor(from, out flag4, out flag3, out flag2, out flag);
            if (trimmedColor.Length == 0)
            {
                throw new FormatException("Brush value empty.");
            }
            if (flag3)
            {
                SolidColorBrush result = new SolidColorBrush();
                result.SetValue("Color", from);
                return result;
            }
            if (flag2)
            {
                //return new SolidColorBrush(ParseContextColor(trimmedColor, formatProvider, context));
                throw new NotImplementedException(string.Format("Context colors have not yet been implemented. {0}", from));
            }
            if (flag)
            {
                //return new SolidColorBrush(ParseScRgbColor(trimmedColor, formatProvider));
                throw new NotImplementedException(string.Format("ScRgb colors have not yet been implemented. {0}", from));
            }
            if (flag4)
            {
                //SolidColorBrush brush2 = KnownColors.ColorStringToKnownBrush(trimmedColor);
                //if (brush2 != null)
                //{
                //    return brush2;
                //}
                throw new NotImplementedException(string.Format("Known colors have not yet been implemented. {0}", from));
            }
            throw new FormatException("An illegal brush value has been provided.");
        }

        public Type ConversionType
        {
            get { return typeof(Brush); }
        }
    }
}
