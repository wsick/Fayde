using Fayde.Primitives;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    [Element("Fayde")]
    public abstract class FrameworkElement : UIElement
    {
        public static readonly PropertyDescription MarginProperty = PropertyDescription.Register("Margin", typeof(Thickness), typeof(FrameworkElement));
        public static readonly PropertyDescription HorizontalAlignmentProperty = PropertyDescription.Register("HorizontalAlignment", typeof(HorizontalAlignment), typeof(FrameworkElement));
        public static readonly PropertyDescription VerticalAlignmentProperty = PropertyDescription.Register("VerticalAlignment", typeof(VerticalAlignment), typeof(FrameworkElement));
        public static readonly PropertyDescription MinWidthProperty = PropertyDescription.Register("MinWidth", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription MinHeightProperty = PropertyDescription.Register("MinHeight", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription WidthProperty = PropertyDescription.Register("Width", typeof(Length), typeof(FrameworkElement));
        public static readonly PropertyDescription HeightProperty = PropertyDescription.Register("Height", typeof(Length), typeof(FrameworkElement));
        public static readonly PropertyDescription StyleProperty = PropertyDescription.Register("Style", typeof(Style), typeof(FrameworkElement));
        public static readonly PropertyDescription MaxWidthProperty = PropertyDescription.Register("MaxWidth", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription MaxHeightProperty = PropertyDescription.Register("MaxHeight", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription FlowDirectionProperty = PropertyDescription.Register("FlowDirection", typeof(FlowDirection), typeof(FrameworkElement));
        public static readonly PropertyDescription DataContextProperty = PropertyDescription.Register("DataContext", typeof(object), typeof(FrameworkElement));
        public static readonly PropertyDescription TriggersProperty = PropertyDescription.Register("Triggers", typeof(DependencyObjectCollection<TriggerBase>), typeof(FrameworkElement));
        public static readonly PropertyDescription CursorProperty = PropertyDescription.Register("Cursor", typeof(CursorType), typeof(FrameworkElement));

        public static readonly PropertyDescription ResourcesProperty = PropertyDescription.Register("Resources", typeof(ResourceDictionary), typeof(FrameworkElement), false, true);
        public ResourceDictionary Resources
        {
            get { return GetValue("Resources") as ResourceDictionary; }
        }

        public static readonly EventDescription SizeChangedEvent = EventDescription.Register("SizeChanged", typeof(FrameworkElement));

        protected override void OnToJsonEnd(System.Text.StringBuilder sb, IJsonOutputModifiers outputMods)
        {
            base.OnToJsonEnd(sb, outputMods);
            var res = Resources;
            if (res != null)
            {
                sb.AppendLine(",");
                sb.Append("Resources:");
                sb.Append(res.ToJson(0, outputMods));
            }
        }
    }
}