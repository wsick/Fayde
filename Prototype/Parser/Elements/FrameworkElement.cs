using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    public abstract class FrameworkElement: UIElement
    {
        [Property]
        [ThicknessConverter]
        public Thickness Margin { get; set; }
        [Property]
        public HorizontalAlignment HorizontalAlignment { get; set; }
        [Property]
        [DoubleConverter]
        public double MinWidth { get; set; }
        [Property]
        [DoubleConverter]
        public double MinHeight { get; set; }

        protected virtual string propsToJson()
        {
            StringBuilder sb = new StringBuilder();
            if (Margin != null)
                sb.AppendLine(string.Format("Margin: new Thickness({0}, {1}, {2}, {3}),", Margin.Left, Margin.Top, Margin.Right, Margin.Bottom));
            sb.AppendLine(string.Format("MinWidth: {0},", MinWidth));
            sb.AppendLine(string.Format("MinHeight: {0},", MinHeight));
            if (HorizontalAlignment != null)
                sb.AppendLine(string.Format("HorizontalAlignment: {0}.{1},", HorizontalAlignment.GetType().Name, HorizontalAlignment.ToString()));
            return sb.ToString();
        }
    }
}
