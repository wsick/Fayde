using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class ContentControl : Control
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(object), typeof(ContentControl), true);
    }
}
