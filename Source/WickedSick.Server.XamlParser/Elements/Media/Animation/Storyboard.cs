using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element]
    public class Storyboard: Timeline
    {
        public static readonly PropertyDescription Animations = PropertyDescription.Register("Animations", typeof(List<Timeline>), typeof(Storyboard), true);
        public static readonly AttachedPropertyDescription TargetName = AttachedPropertyDescription.Register("TargetName", typeof(string), typeof(Storyboard));
        public static readonly AttachedPropertyDescription TargetProperty = AttachedPropertyDescription.Register("TargetProperty", typeof(PropertyPath), typeof(Storyboard));
    }
}
