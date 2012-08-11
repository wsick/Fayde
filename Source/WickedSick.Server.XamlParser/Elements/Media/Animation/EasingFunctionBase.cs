using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class EasingFunctionBase : DependencyObject, IEasingFunction
    {
        public static readonly PropertyDescription EasingModeProperty = PropertyDescription.Register("EasingMode", typeof(EasingMode), typeof(EasingFunctionBase));
    }
}