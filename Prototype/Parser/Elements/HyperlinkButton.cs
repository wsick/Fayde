using System;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class HyperlinkButton : ButtonBase
    {
        [Property]
        [UriTypeConverter]
        public JsonUri NavigateUri { get; set; }
    }
}
