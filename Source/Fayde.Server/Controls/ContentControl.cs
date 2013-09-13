using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ContentControl : Control
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(object), typeof(ContentControl), true);
    }
}