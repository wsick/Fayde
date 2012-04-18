using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class Storyboard: Timeline
    {
        public static readonly PropertyDescription Animations = PropertyDescription.Register("Animations", typeof(DependencyObjectCollection<Timeline>), typeof(Storyboard), true);
        public static readonly AttachedPropertyDescription TargetName = AttachedPropertyDescription.Register("TargetName", typeof(string), typeof(Storyboard));
        public static readonly AttachedPropertyDescription TargetProperty = AttachedPropertyDescription.Register("TargetProperty", typeof(PropertyPath), typeof(Storyboard));
    }
}
