using WickedSick.Server.XamlParser.Elements.Data;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ContentPresenter : FrameworkElement
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(object), typeof(ContentPresenter), true);
        public static readonly PropertyDescription ContentTemplate = PropertyDescription.Register("ContentTemplate", typeof(DataTemplate), typeof(ContentPresenter));
    }
}