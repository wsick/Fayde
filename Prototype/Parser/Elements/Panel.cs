using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.TypeConverters;

namespace Parser.Elements
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

        protected override string propsToJson()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(base.propsToJson());
            if (Background != null)
            {
                sb.Append("Background: ");
                sb.AppendLine(Background.toJson(0));
            }
            return sb.ToString();
        }

        protected string contentToJson()
        {
            StringBuilder sb = new StringBuilder();
            foreach (UIElement e in Children)
            {
                sb.Append(e.toJson(0));
                sb.AppendLine(",");
            }
            return sb.ToString();
        }
    }
}
