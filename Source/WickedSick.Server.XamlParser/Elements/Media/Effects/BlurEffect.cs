
namespace WickedSick.Server.XamlParser.Elements.Media.Effects
{
    [Element(NullstoneNamespace = "Fayde.Media.Effects")]
    public class BlurEffect : Effect
    {
        public static readonly PropertyDescription RadiusProperty = PropertyDescription.Register("Radius", typeof(double), typeof(BlurEffect));
    }
}