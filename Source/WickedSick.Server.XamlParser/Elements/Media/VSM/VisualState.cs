using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Media.Animation;

namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    [Element]
    public class VisualState
    {
        public static readonly PropertyDescription Storyboard = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(VisualState), true);
    }
}
