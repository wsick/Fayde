using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class ToolTipService: DependencyObject
    {
        public static readonly AttachedPropertyDescription PlacementTarget = AttachedPropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTipService));
    }
}
