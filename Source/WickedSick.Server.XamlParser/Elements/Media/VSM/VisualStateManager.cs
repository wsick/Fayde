using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Media.Animation;

namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    public class VisualStateManager: DependencyObject
    {
        public static readonly AttachedPropertyDescription VisualStateGroups = AttachedPropertyDescription.Register("VisualStateGroups", typeof(DependencyObjectCollection<VisualStateGroup>), typeof(VisualStateManager));
    }
}
