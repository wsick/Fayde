using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class Panel: FrameworkElement
    {
        [Property]
        [BrushTypeConverter]
        public Brush Background { get; set; }

        private IList<UIElement> _children = new List<UIElement>();
        [Content]
        public IList<UIElement> Children
        {
            get { return _children; }
        }
    }
}
