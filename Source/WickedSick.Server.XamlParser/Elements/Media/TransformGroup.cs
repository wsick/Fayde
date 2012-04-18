using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class TransformGroup: Transform
    {
        public static readonly PropertyDescription Children = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<Transform>), typeof(TransformGroup), true);
    }
}
