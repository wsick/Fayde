using Fayde.Controls.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ProgressBar : RangeBase
    {
        public static readonly PropertyDescription IsIndeterminateProperty = PropertyDescription.Register("IsIndeterminate", typeof(bool), typeof(ProgressBar));
    }
}