using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ColumnDefinition : DependencyObject
    {
        public static readonly PropertyDescription WidthProperty = PropertyDescription.Register("Width", typeof(GridLength), typeof(ColumnDefinition));
        public static readonly PropertyDescription MaxWidthProperty = PropertyDescription.Register("MaxWidth", typeof(Double), typeof(ColumnDefinition));
        public static readonly PropertyDescription MinWidthProperty = PropertyDescription.Register("MinWidth", typeof(Double), typeof(ColumnDefinition));
    }
}