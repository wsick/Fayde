using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class ObjectAnimationUsingKeyFrames: Timeline
    {
        public static readonly PropertyDescription KeyFrames = PropertyDescription.Register("KeyFrames", typeof(List<ObjectKeyFrame>), typeof(ObjectAnimationUsingKeyFrames), true);
    }
}
