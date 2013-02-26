
namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public class DataTemplate : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(DataTemplate), true);
    }
}