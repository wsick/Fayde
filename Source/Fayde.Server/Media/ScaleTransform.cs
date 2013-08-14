using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class ScaleTransform : Transform
    {
        public static readonly PropertyDescription CenterXProperty = PropertyDescription.Register("CenterX", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription CenterYProperty = PropertyDescription.Register("CenterY", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription ScaleXProperty = PropertyDescription.Register("ScaleX", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription ScaleYProperty = PropertyDescription.Register("ScaleY", typeof(Double), typeof(ScaleTransform));
    }
}