using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    internal enum FillRuleEnum
    {
        EvenOdd,
        NonZero,
    }

    public class FillRule : IJsonSerializable
    {
        private FillRuleEnum _FillRule;

        internal FillRule(FillRuleEnum fillRule)
        {
            _FillRule = fillRule;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", GetType().Name, _FillRule.ToString());
        }
    }

    public class FillRuleConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            return new FillRule((FillRuleEnum)Enum.Parse(typeof(FillRuleEnum), from));
        }

        public Type ConversionType
        {
            get { return typeof(FillRule); }
        }
    }
}
