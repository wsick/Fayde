using WickedSick.Server.XamlParser.Elements.Data;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ItemsControl : Control
    {
        public static readonly PropertyDescription Items = PropertyDescription.Register("Items", typeof(DependencyObjectCollection<object>), typeof(ItemsControl), true);
        public static readonly PropertyDescription ItemTemplateProperty = PropertyDescription.Register("ItemTemplate", typeof(DataTemplate), typeof(ItemsControl));
        public static readonly PropertyDescription ItemsSourceProperty = PropertyDescription.Register("ItemsSource", typeof(object), typeof(ItemsControl));
        public static readonly PropertyDescription ItemsPanelProperty = PropertyDescription.Register("ItemsPanel", typeof(ItemsPanelTemplate), typeof(ItemsControl));
    }
}