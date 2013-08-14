using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class EasingFunctionBase : DependencyObject, IEasingFunction
    {
        public static readonly PropertyDescription EasingModeProperty = PropertyDescription.Register("EasingMode", typeof(EasingMode), typeof(EasingFunctionBase));
    }
}