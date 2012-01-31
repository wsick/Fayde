using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class TextBlock: FrameworkElement
    {
        [Property]
        [TextWrappingConverter]
        public TextWrapping TextWrapping { get; set; }
        [Property]
        [Content]
        public string Text { get; set; }
        [Property]
        [DoubleConverter]
        public double FontSize { get; set; }

        public override string toJson(int tabIndents)
        {
            throw new NotImplementedException();
        }
    }
}
