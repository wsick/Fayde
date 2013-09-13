using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class Brush : DependencyObject
    {
        public static readonly PropertyDescription TransformProperty = PropertyDescription.Register("Transform", typeof(Transform), typeof(Brush));
    }
}