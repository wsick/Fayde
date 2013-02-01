using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public class SolidColorBrush : Brush
    {
        public static readonly PropertyDescription ColorProperty = PropertyDescription.Register("Color", typeof(Color), typeof(SolidColorBrush));
    }
}