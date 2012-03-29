using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class UIElement : DependencyObject
    {
        public static readonly PropertyDescription Cursor = PropertyDescription.Register("Cursor", typeof(string), typeof(UIElement));
    }
}
