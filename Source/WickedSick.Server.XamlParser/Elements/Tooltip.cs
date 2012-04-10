using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class ToolTip: ContentControl
    {
        public static readonly PropertyDescription Placement = PropertyDescription.Register("Placement", typeof(PlacementMode), typeof(ToolTip));
        public static readonly PropertyDescription PlacementTarget = PropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTip));
    }
}
