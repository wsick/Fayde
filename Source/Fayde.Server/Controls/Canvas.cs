using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Canvas : Panel
    {
        public static readonly AttachedPropertyDescription ZIndexProperty = AttachedPropertyDescription.Register("ZIndex", typeof(int), typeof(Canvas));
    }
}