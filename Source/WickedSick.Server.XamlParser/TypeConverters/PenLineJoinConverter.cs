using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    internal enum PenLineJoinEnum
    {
        Miter,
        Bevel,
        Round,
    }

    public class PenLineJoin : IJsonSerializable
    {
        private PenLineJoinEnum _PenLineJoin;

        internal PenLineJoin(PenLineJoinEnum penLineJoin)
        {
            _PenLineJoin = penLineJoin;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", GetType().Name, _PenLineJoin.ToString());
        }
    }

    public class PenLineJoinConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PenLineJoin); }
        }

        public object Convert(string from)
        {
            return new PenLineJoin((PenLineJoinEnum)Enum.Parse(typeof(PenLineJoinEnum), from));
        }
    }
}
