using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class Popup: FrameworkElement
    {
        public static readonly PropertyDescription Child = PropertyDescription.Register("Child", typeof(UIElement), typeof(Popup), true);
    }
}
