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
        [BrushTypeConverter]
        public Brush Foreground { get; set; }

        [Property]
        [Content]
        public string Text { get; set; }

        [Property]
        [FontSizeConverter]
        public FontSize FontSize { get; set; }
    }
}
