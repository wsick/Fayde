using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    internal enum VerticalAlignmentEnum
    {
        Top,
        Center,
        Bottom,
        Stretch
    }

    public class VerticalAlignment : IJsonSerializable
    {
        private VerticalAlignmentEnum _alignment;

        internal VerticalAlignment(VerticalAlignmentEnum alignment)
        {
            _alignment = alignment;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", this.GetType().Name, _alignment.ToString());
        }
    }

    public class VerticalAlignmentConverter : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            return new VerticalAlignment((VerticalAlignmentEnum)Enum.Parse(typeof(VerticalAlignmentEnum), from));
        }
    }
}
