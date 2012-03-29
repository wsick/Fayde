using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class TemplateBinding: IJsonSerializable
    {
        public string SourcePropertyName { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new TemplateBindingMarkup(\"{0}\")", SourcePropertyName);
        }
    }
}
