using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class PointAnimation : Timeline
    {
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(Point), typeof(Timeline));
    }
}