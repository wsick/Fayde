using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public abstract class Timeline : DependencyObject
    {
        public static readonly PropertyDescription BeginTimeProperty = PropertyDescription.Register("BeginTime", typeof(Primitives.TimeSpan), typeof(Timeline));
        public static readonly PropertyDescription Duration = PropertyDescription.Register("Duration", typeof(Duration), typeof(Timeline));
        public static readonly PropertyDescription RepeatBehavior = PropertyDescription.Register("RepeatBehavior", typeof(RepeatBehavior), typeof(Timeline));
    }
}