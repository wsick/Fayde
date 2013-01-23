using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class ColorAnimation : Timeline
    {
        public static readonly PropertyDescription ToProperty = PropertyDescription.Register("To", typeof(Color), typeof(ColorAnimation));
    }
}