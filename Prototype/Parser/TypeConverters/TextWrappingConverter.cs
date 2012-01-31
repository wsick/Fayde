using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.Elements;

namespace Parser.TypeConverters
{
    public enum TextWrappingEnum
    {
        Wrap,
        NoWrap
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
            throw new NotImplementedException();
        }
    }

    public class TextWrappingConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            return (TextWrappingEnum)Enum.Parse(typeof(TextWrappingEnum), from);
        }
    }
}
