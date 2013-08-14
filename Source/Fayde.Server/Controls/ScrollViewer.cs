using Fayde.Controls;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ScrollViewer : ContentControl
    {
        public static readonly PropertyDescription HorizontalScrollBarVisibilityProperty = PropertyDescription.Register("HorizontalScrollBarVisibility", typeof(ScrollBarVisibility), typeof(ScrollViewer));
        public static readonly PropertyDescription VerticalScrollBarVisibilityProperty = PropertyDescription.Register("VerticalScrollBarVisibility", typeof(ScrollBarVisibility), typeof(ScrollViewer));
    }
}