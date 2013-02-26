using System;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public abstract class Timeline : DependencyObject
    {
        public static readonly PropertyDescription BeginTimeProperty = PropertyDescription.Register("BeginTime", typeof(WickedSick.Server.XamlParser.Elements.Types.TimeSpan), typeof(Timeline));
        public static readonly PropertyDescription Duration = PropertyDescription.Register("Duration", typeof(Duration), typeof(Timeline));
        public static readonly PropertyDescription RepeatBehavior = PropertyDescription.Register("RepeatBehavior", typeof(RepeatBehavior), typeof(Timeline));
    }
}