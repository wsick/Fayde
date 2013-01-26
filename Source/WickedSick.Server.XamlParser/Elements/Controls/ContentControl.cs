
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ContentControl : Control
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(object), typeof(ContentControl), true);
    }
}