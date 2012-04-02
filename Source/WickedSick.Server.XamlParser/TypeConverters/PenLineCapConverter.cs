using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    internal enum PenLineCapEnum
    {
        Flat,
        Square,
        Round,
        Triangle,
    }

    public class PenLineCap : IJsonSerializable
    {
        private PenLineCapEnum _PenLineCap;

        internal PenLineCap(PenLineCapEnum penLineCap)
        {
            _PenLineCap = penLineCap;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", GetType().Name, _PenLineCap.ToString());
        }
    }

    public class PenLineCapConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PenLineCap); }
        }

        public object Convert(string from)
        {
            return new PenLineCap((PenLineCapEnum)Enum.Parse(typeof(PenLineCapEnum), from));
        }
    }
}
