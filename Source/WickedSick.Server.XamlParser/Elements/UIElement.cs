using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class UIElement : DependencyObject
    {
        public static readonly PropertyDescription Cursor = PropertyDescription.Register("Cursor", typeof(string), typeof(UIElement));
        public static readonly PropertyDescription Opacity = PropertyDescription.Register("Opacity", typeof(double), typeof(UIElement));
        public static readonly PropertyDescription IsHitTestVisible = PropertyDescription.Register("IsHitTestVisible", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription RenderTransformOrigin = PropertyDescription.Register("RenderTransformOrigin", typeof(Point), typeof(UIElement));
        public static readonly PropertyDescription RenderTransform = PropertyDescription.Register("RenderTransform", typeof(Transform), typeof(UIElement));
        public static readonly PropertyDescription UseLayoutRounding = PropertyDescription.Register("UseLayoutRounding", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription Visibility = PropertyDescription.Register("Visibility", typeof(Visibility), typeof(UIElement));
    }
}
