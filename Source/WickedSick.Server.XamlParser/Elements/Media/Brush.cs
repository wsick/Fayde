using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class Brush: DependencyObject
    {
        public static readonly PropertyDescription Transform = PropertyDescription.Register("Transform", typeof(Transform), typeof(Brush));
    }
}
