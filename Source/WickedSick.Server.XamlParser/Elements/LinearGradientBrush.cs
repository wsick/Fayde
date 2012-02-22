using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class LinearGradientBrush : Brush
    {
        [Property]
        [PointConverter]
        public Point StartPoint { get; set; }
        
        [Property]
        [PointConverter]
        public Point EndPoint { get; set; }

        private IList<GradientStop> _gradientStops = new List<GradientStop>();
        [Content]
        public IList<GradientStop> GradientStops
        {
            get { return _gradientStops; }
        }
    }
}
