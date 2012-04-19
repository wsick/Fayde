using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class StaticResource: IJsonSerializable
    {
        public string ResourceKey { get; set; }

        public StaticResource(string name)
        {
            ResourceKey = name;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("new StaticResourceMarkup(\"{0}\")", ResourceKey);
        }
    }
}
