using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ItemsControl: Control
    {
        public static readonly PropertyDescription Items = PropertyDescription.Register("Items", typeof(DependencyObjectCollection<object>), typeof(ItemsControl), true);
        public static readonly PropertyDescription ItemTemplateProperty = PropertyDescription.Register("ItemTemplate", typeof(DataTemplate), typeof(ItemsControl));
        public static readonly PropertyDescription ItemsSourceProperty = PropertyDescription.Register("ItemsSource", typeof(DependencyObjectCollection<object>), typeof(ItemsControl));
    }
}
