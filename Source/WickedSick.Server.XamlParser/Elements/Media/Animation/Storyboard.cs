using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element]
    public class Storyboard
    {
        public static readonly PropertyDescription Animations = PropertyDescription.Register("Animations", typeof(IList<Timeline>), typeof(Storyboard), true);
    }
}
