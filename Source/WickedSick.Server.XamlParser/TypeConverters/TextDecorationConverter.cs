using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class TextDecorationConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(TextDecoration); }
        }

        public object Convert(string from)
        {
            return new TextDecoration(from);
        }
    }
}
