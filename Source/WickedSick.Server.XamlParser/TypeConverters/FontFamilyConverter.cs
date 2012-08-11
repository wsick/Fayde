using System;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class FontFamilyConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(FontFamily); }
        }

        public object Convert(string from)
        {
            return new FontFamily
            {
                FamilyNames = from,
            };
        }
    }
}