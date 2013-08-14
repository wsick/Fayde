using Fayde.Xaml.Metadata;

namespace Fayde.Media.Effects
{
    public class BlurEffect : Effect
    {
        public static readonly PropertyDescription RadiusProperty = PropertyDescription.Register("Radius", typeof(double), typeof(BlurEffect));
    }
}