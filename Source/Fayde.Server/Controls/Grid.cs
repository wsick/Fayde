using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Grid : Panel
    {
        public static readonly PropertyDescription ColumnDefinitions = PropertyDescription.Register("ColumnDefinitions", typeof(DependencyObjectCollection<ColumnDefinition>), typeof(Grid));
        public static readonly PropertyDescription RowDefinitions = PropertyDescription.Register("RowDefinitions", typeof(DependencyObjectCollection<RowDefinition>), typeof(Grid));
        public static readonly AttachedPropertyDescription ColumnSpan = AttachedPropertyDescription.Register("ColumnSpan", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription RowSpan = AttachedPropertyDescription.Register("RowSpan", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription Row = AttachedPropertyDescription.Register("Row", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription Column = AttachedPropertyDescription.Register("Column", typeof(int), typeof(Grid));
        public static readonly PropertyDescription ShowGridLines = PropertyDescription.Register("ShowGridLines", typeof(bool), typeof(Grid));
    }
}