
namespace WickedSick.Server.XamlParser.Elements.Data
{
    public class DataTemplate : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(DataTemplate), true);
    }
}