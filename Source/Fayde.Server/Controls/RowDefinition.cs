using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class RowDefinition : DependencyObject
    {
        public static readonly PropertyDescription HeightProperty = PropertyDescription.Register("Height", typeof(GridLength), typeof(RowDefinition));
        public static readonly PropertyDescription MaxHeightProperty = PropertyDescription.Register("MaxHeight", typeof(Double), typeof(RowDefinition));
        public static readonly PropertyDescription MinHeightProperty = PropertyDescription.Register("MinHeight", typeof(Double), typeof(RowDefinition));
    }
}