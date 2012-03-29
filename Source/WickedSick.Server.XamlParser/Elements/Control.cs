using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class Control : FrameworkElement
    {
        public static readonly PropertyDescription Background = PropertyDescription.Register("Background", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription Foreground = PropertyDescription.Register("Foreground", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderBrush = PropertyDescription.Register("BorderBrush", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderThickness = PropertyDescription.Register("BorderThickness", typeof(Thickness), typeof(Control));
        public static readonly PropertyDescription Template = PropertyDescription.Register("Template", typeof(ControlTemplate), typeof(Control));
    }
}
