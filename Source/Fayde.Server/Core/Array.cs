using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    public class Array : DependencyObjectCollection<object>
    {
        public static readonly PropertyDescription ElementsProperty = PropertyDescription.Register("Elements", typeof(DependencyObjectCollection<object>), typeof(Array), true);
    }
}