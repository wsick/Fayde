using Fayde.Controls.Primitives;
using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ListBox : Selector
    {
        public static readonly PropertyDescription SelectionModeProperty = PropertyDescription.Register("SelectionMode", typeof(SelectionMode), typeof(ListBox));
        public static readonly PropertyDescription ItemContainerStyleProperty = PropertyDescription.Register("ItemContainerStyle", typeof(Style), typeof(ListBox));
    }
}