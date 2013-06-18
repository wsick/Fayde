using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace WickedSick.Server.XamlParser.Elements.Data
{
    [Element("Fayde.Data")]
    public enum BindingMode
    {
        OneWay,
        OneTime,
        TwoWay
    }

    [Element("Fayde.Data")]
    public enum UpdateSourceTrigger
    {
        Default,
        Explicit
    }

    [Element("Fayde", "BindingMarkup")]
    public class Binding : IJsonConvertible
    {
        public object FallbackValue { get; set; }
        public string Path { get; set; }
        public BindingMode Mode { get; set; }
        public object Source { get; set; }
        public bool BindsDirectlyToSource { get; set; }
        public string StringFormat { get; set; }
        public object TargetNullValue { get; set; }
        public IValueConverter Converter { get; set; }
        public CultureInfo ConverterCulture { get; set; }
        public object ConverterParameter { get; set; }
        public bool NotifyOnValidationError { get; set; }
        public bool ValidatesOnExceptions { get; set; }
        public bool ValidatesOnDataErrors { get; set; }
        public bool ValidatesOnNotifyDataErrors { get; set; }
        public RelativeSource RelativeSource { get; set; }
        public string ElementName { get; set; }
        public UpdateSourceTrigger UpdateSourceTrigger { get; set; }

        public Binding()
        {
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("new ");
            sb.Append(ElementAttribute.GetFullNullstoneType(GetType(), outputMods));
            sb.Append("({ ");
            sb.Append(string.Join(", ", GetPropertiesJson(tabIndents, outputMods)));
            sb.Append(" })");
            return sb.ToString();
        }

        private IEnumerable<string> GetPropertiesJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            if (Mode != BindingMode.OneWay)
                yield return string.Format("Mode: {0}.{1}", ElementAttribute.GetFullNullstoneType(typeof(BindingMode), outputMods), Mode);
            if (Path != null)
                yield return string.Format("Path: \"{0}\"", Path);
            if (FallbackValue != null)
            {
                var ijc = FallbackValue as IJsonConvertible;
                if (ijc != null)
                    yield return string.Format("FallbackValue: {0}", ijc.ToJson(tabIndents, outputMods));
                else if (FallbackValue is string)
                    yield return string.Format("FallbackValue: \"{0}\"", FallbackValue);
                else
                    yield return string.Format("FallbackValue: {0}", FallbackValue);
            }
            if (StringFormat != null)
                yield return string.Format("StringFormat: \"{0}\"", StringFormat);
            if (ElementName != null)
                yield return string.Format("ElementName: \"{0}\"", ElementName);
        }
    }
}