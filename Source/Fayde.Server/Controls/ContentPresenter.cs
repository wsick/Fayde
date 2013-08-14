using Fayde.Core;
using Fayde.Data;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ContentPresenter : FrameworkElement
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(object), typeof(ContentPresenter), true);
        public static readonly PropertyDescription ContentTemplate = PropertyDescription.Register("ContentTemplate", typeof(DataTemplate), typeof(ContentPresenter));
    }
}