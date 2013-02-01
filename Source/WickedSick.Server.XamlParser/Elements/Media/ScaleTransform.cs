using System;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace="Fayde.Media")]
    public class ScaleTransform : Transform
    {
        public static readonly PropertyDescription CenterXProperty = PropertyDescription.Register("CenterX", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription CenterYProperty = PropertyDescription.Register("CenterY", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription ScaleXProperty = PropertyDescription.Register("ScaleX", typeof(Double), typeof(ScaleTransform));
        public static readonly PropertyDescription ScaleYProperty = PropertyDescription.Register("ScaleY", typeof(Double), typeof(ScaleTransform));
    }
}