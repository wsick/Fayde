using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

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

    public class VerticalAlignmentConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            return new VerticalAlignment((VerticalAlignmentEnum)Enum.Parse(typeof(VerticalAlignmentEnum), from));
        }

        public Type ConversionType
        {
            get { return typeof(VerticalAlignment); }
        }
    }
}
