using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element]
    public class Storyboard
    {
        private IList<Timeline> _animations = new List<Timeline>();
        [Content]
        public IList<Timeline> Animations
        {
            get { return _animations; }
        }
    }
}
