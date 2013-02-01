using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public class TileBrush : Brush
    {
        public static readonly PropertyDescription AlignmentXProperty = PropertyDescription.Register("AlignmentX", typeof(AlignmentX), typeof(TileBrush));
        public static readonly PropertyDescription AlignmentYProperty = PropertyDescription.Register("AlignmentY", typeof(AlignmentY), typeof(TileBrush));
        public static readonly PropertyDescription StretchProperty = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(TileBrush));
    }
}