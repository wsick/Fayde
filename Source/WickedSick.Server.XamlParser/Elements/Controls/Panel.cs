using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class Panel: FrameworkElement
    {
        public static readonly PropertyDescription Background = PropertyDescription.Register("Background", typeof(Brush), typeof(Panel));
        public static readonly PropertyDescription Children = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<UIElement>), typeof(Panel), true);
    }
}
