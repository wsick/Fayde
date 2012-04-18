using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public abstract class Control : FrameworkElement
    {
        public static readonly PropertyDescription Background = PropertyDescription.Register("Background", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription Foreground = PropertyDescription.Register("Foreground", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderBrush = PropertyDescription.Register("BorderBrush", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderThickness = PropertyDescription.Register("BorderThickness", typeof(Thickness), typeof(Control));
        public static readonly PropertyDescription Template = PropertyDescription.Register("Template", typeof(ControlTemplate), typeof(Control));
        public static readonly PropertyDescription TabNavigation = PropertyDescription.Register("TabNavigation", typeof(KeyboardNavigationMode), typeof(Control));
        public static readonly PropertyDescription IsTabStop = PropertyDescription.Register("IsTabStop", typeof(bool), typeof(Control));
        public static readonly PropertyDescription HorizontalContentAlignment = PropertyDescription.Register("HorizontalContentAlignment", typeof(HorizontalAlignment), typeof(Control));
        public static readonly PropertyDescription VerticalContentAlignment = PropertyDescription.Register("VerticalContentAlignment", typeof(VerticalAlignment), typeof(Control));
    }
}
