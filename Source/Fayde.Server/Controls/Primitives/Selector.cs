using Fayde.Xaml.Metadata;

namespace Fayde.Controls.Primitives
{
    public class Selector : ItemsControl
    {
        public static readonly PropertyDescription SelectedItemProperty = PropertyDescription.Register("SelectedItem", typeof(object), typeof(Selector));
    }
}