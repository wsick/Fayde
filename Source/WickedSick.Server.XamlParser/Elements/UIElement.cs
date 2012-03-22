using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class UIElement : DependencyObject
    {
        [Property]
        public string Cursor { get; set; }
    }
}
