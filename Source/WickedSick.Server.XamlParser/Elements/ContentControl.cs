using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class ContentControl : Control
    {
        [Property]
        [Content]
        public object Content { get; set; }
    }
}
