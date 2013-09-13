using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class SolidColorBrush : Brush
    {
        public static readonly PropertyDescription ColorProperty = PropertyDescription.Register("Color", typeof(Color), typeof(SolidColorBrush));
    }
}