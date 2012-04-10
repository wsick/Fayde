using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class FrameworkElement: UIElement
    {
        public static readonly PropertyDescription Margin = PropertyDescription.Register("Margin", typeof(Thickness), typeof(FrameworkElement));
        public static readonly PropertyDescription Padding = PropertyDescription.Register("Padding", typeof(Thickness), typeof(FrameworkElement));
        public static readonly PropertyDescription HorizontalAlignment = PropertyDescription.Register("HorizontalAlignment", typeof(HorizontalAlignment), typeof(FrameworkElement));
        public static readonly PropertyDescription VerticalAlignment = PropertyDescription.Register("VerticalAlignment", typeof(VerticalAlignment), typeof(FrameworkElement));
        public static readonly PropertyDescription MinWidth = PropertyDescription.Register("MinWidth", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription MinHeight = PropertyDescription.Register("MinHeight", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription Width = PropertyDescription.Register("Width", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription Height = PropertyDescription.Register("Height", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription Style = PropertyDescription.Register("Style", typeof(Style), typeof(FrameworkElement));
        public static readonly PropertyDescription MaxWidth = PropertyDescription.Register("MaxWidth", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription MaxHeight = PropertyDescription.Register("MaxHeight", typeof(double), typeof(FrameworkElement));
        public static readonly PropertyDescription FlowDirection = PropertyDescription.Register("FlowDirection", typeof(FlowDirection), typeof(FrameworkElement));
        public static readonly PropertyDescription Resources = PropertyDescription.Register("Resources", typeof(ResourceDictionary), typeof(FrameworkElement));
    }
}
