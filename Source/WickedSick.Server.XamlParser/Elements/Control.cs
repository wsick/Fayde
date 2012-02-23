using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class Control : FrameworkElement
    {
        [Property]
        [BrushTypeConverter]
        public Brush Background { get; set; }

        [Property]
        [BrushTypeConverter]
        public Brush Foreground { get; set; }

        [Property]
        [BrushTypeConverter]
        public Brush BorderBrush { get; set; }

        [Property]
        [ThicknessConverter]
        public Thickness BorderThickness { get; set; }

        [Property]
        [ThicknessConverter]
        public Thickness Padding { get; set; }
    }
}
