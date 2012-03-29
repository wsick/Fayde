using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class Panel: FrameworkElement
    {
        public static readonly PropertyDescription Background = PropertyDescription.Register("Background", typeof(Brush), typeof(Panel));
        public static readonly PropertyDescription Children = PropertyDescription.Register("Children", typeof(List<UIElement>), typeof(Panel), true);
    }
}
