using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public abstract class UIElement : Visual
    {
        [Property]
        public string Cursor { get; set; }
    }
}
