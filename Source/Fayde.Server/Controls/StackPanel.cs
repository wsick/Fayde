using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class StackPanel : Panel
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(StackPanel));
    }
}