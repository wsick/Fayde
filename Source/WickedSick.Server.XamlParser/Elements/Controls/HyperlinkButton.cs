using System;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;
using WickedSick.Server.XamlParser.Elements.Controls.Primitives;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class HyperlinkButton : ButtonBase
    {
        public static readonly PropertyDescription NavigateUriProperty = PropertyDescription.Register("NavigateUri", typeof(JsonUri), typeof(HyperlinkButton));
        public static readonly PropertyDescription TargetNameProperty = PropertyDescription.Register("TargetName", typeof(string), typeof(HyperlinkButton));
    }
}