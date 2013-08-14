using Fayde.Media;
using Fayde.Xaml.Metadata;

namespace Fayde.Shapes
{
    [Element("Fayde.Shapes")]
    public class Path : Shape
    {
        public static readonly PropertyDescription DataProperty = PropertyDescription.Register("Data", typeof(Geometry), typeof(Path));
    }
}