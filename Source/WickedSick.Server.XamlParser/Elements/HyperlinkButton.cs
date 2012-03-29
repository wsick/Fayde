using System;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class HyperlinkButton : ButtonBase
    {
        public static readonly PropertyDescription NavigateUri = PropertyDescription.Register("NavigateUri", typeof(JsonUri), typeof(HyperlinkButton));
    }
}
