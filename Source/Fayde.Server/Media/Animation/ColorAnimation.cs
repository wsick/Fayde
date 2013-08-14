using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class ColorAnimation : Timeline
    {
        public static readonly PropertyDescription ToProperty = PropertyDescription.Register("To", typeof(Color), typeof(ColorAnimation));
    }
}