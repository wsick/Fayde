using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class BeginStoryboard: TriggerAction
    {
        public static readonly PropertyDescription Storyboard = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(BeginStoryboard), true);
    }
}
