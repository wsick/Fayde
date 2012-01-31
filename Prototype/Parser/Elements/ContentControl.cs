using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public abstract class ContentControl : Control
    {
        [Content]
        public object Content { get; set; }
    }
}
