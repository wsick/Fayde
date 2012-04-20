using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public enum BindingMode
    {
        OneTime,
        OneWay,
        TwoWay
    }

    public enum UpdateSourceTrigger
    {
        Default,
        Explicit
    }

    public class Binding: IJsonSerializable
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
            Mode = BindingMode.TwoWay;
        }

        public string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("new BindingMarkup({ ");
            sb.Append("'Path': ");
            sb.Append(Path);

            sb.Append(", 'Mode': ");
            sb.Append(Mode.ToString());

            if (FallbackValue != null)
            {
                sb.Append(", 'FallbackValue': ");
                sb.Append(FallbackValue.ToString());
            }

            sb.AppendLine(" })");
            return sb.ToString();
        }
    }
}
