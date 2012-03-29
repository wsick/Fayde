using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public abstract class Timeline: DependencyObject
    {
        public static readonly PropertyDescription Duration = PropertyDescription.Register("Duration", typeof(Duration), typeof(Timeline));
    }
}
