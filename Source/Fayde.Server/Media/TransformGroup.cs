using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class TransformGroup : Transform
    {
        public static readonly PropertyDescription ChildrenProperty = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<Transform>), typeof(TransformGroup), true);
    }
}