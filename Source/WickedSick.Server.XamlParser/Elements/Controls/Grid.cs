using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class Grid: Panel
    {
        public static readonly PropertyDescription ColumnDefinitions = PropertyDescription.Register("ColumnDefinitions", typeof(DependencyObjectCollection<ColumnDefinition>), typeof(Grid));
        public static readonly PropertyDescription RowDefinitions = PropertyDescription.Register("RowDefinitions", typeof(DependencyObjectCollection<RowDefinition>), typeof(Grid));
        public static readonly AttachedPropertyDescription ColumnSpan = AttachedPropertyDescription.Register("ColumnSpan", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription RowSpan = AttachedPropertyDescription.Register("RowSpan", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription Row = AttachedPropertyDescription.Register("Row", typeof(int), typeof(Grid));
        public static readonly AttachedPropertyDescription Column = AttachedPropertyDescription.Register("Column", typeof(int), typeof(Grid));
    }
}
