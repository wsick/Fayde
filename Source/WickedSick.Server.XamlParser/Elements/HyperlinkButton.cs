using System;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class HyperlinkButton : ButtonBase
    {
        [Property]
        [UriTypeConverter]
        public JsonUri NavigateUri { get; set; }
    }
}
