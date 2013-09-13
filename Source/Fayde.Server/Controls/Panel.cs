using Fayde.Core;
using Fayde.Media;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Panel : FrameworkElement
    {
        public static readonly PropertyDescription BackgroundProperty = PropertyDescription.Register("Background", typeof(Brush), typeof(Panel));
        public static readonly PropertyDescription ChildrenProperty = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<UIElement>), typeof(Panel), true);
    }
}