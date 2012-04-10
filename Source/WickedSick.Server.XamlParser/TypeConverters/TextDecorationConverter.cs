using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class TextDecoration: IJsonSerializable
    {
        private string Decoration { get; set; }

        public TextDecoration(string decoration)
        {
            Decoration = decoration;
        }

        public string toJson(int tabIndents)
        {
            return Decoration;
        }
    }

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
