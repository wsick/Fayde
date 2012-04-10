using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace WickedSick.Server.XamlParser.Elements
{
    public class Page: FrameworkElement
    {
        public static readonly PropertyDescription Title = PropertyDescription.Register("Title", typeof(string), typeof(Page));
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(UIElement), typeof(Page), true);
    }
}
