using Fayde.Controls.Primitives;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class HyperlinkButton : ButtonBase
    {
        public static readonly PropertyDescription NavigateUriProperty = PropertyDescription.Register("NavigateUri", typeof(JsonUri), typeof(HyperlinkButton));
        public static readonly PropertyDescription TargetNameProperty = PropertyDescription.Register("TargetName", typeof(string), typeof(HyperlinkButton));
    }
}