using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class TemplateBinding: IJsonConvertible
    {
        public string SourcePropertyName { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new TemplateBindingMarkup(\"{0}\")", SourcePropertyName);
        }
    }
}
