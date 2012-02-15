using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum TextWrappingEnum
    {
        NoWrap,
        Wrap,
    }

    public class TextWrapping : IJsonSerializable
    {
        private TextWrappingEnum _wrapping;

        internal TextWrapping(TextWrappingEnum wrapping)
        {
            _wrapping = wrapping;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", this.GetType().Name, _wrapping.ToString());
        }
    }

    public class TextWrappingConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            return new TextWrapping((TextWrappingEnum)Enum.Parse(typeof(TextWrappingEnum), from));
        }
    }
}
