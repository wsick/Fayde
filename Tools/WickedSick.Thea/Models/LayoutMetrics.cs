using System.Runtime.Serialization;
using System.Windows;

namespace WickedSick.Thea.Models
{
    public class LayoutMetrics
    {
        public double ActualHeight { get; set; }
        public double ActualWidth { get; set; }

        public Rect LayoutSlot { get; set; }
        public Point VisualOffset { get; set; }
        public Rect LayoutClip { get; set; }

        public Size HiddenDesire { get; set; }
        public Size DesiredSize { get; set; }
        public Size RenderSize { get; set; }

        public double[] AbsoluteXform { get; set; }
        public double[] LayoutXform { get; set; }
        public double[] LocalXform { get; set; }
        public double[] RenderXform { get; set; }

        public static LayoutMetrics FromDynamic(dynamic d)
        {
            var m = new LayoutMetrics();
            m.ActualWidth = d.ActualWidth;
            m.ActualHeight = d.ActualHeight;
            
            m.LayoutSlot = RectFromDynamic(d.LayoutSlot);
            m.VisualOffset = PointFromDynamic(d.VisualOffset);
            m.LayoutClip = RectFromDynamic(d.LayoutClip);

            m.HiddenDesire = SizeFromDynamic(d.HiddenDesire);
            m.DesiredSize = SizeFromDynamic(d.DesiredSize);
            m.RenderSize = SizeFromDynamic(d.RenderSize);

            m.AbsoluteXform = MatrixFromDynamic(d.AbsoluteXform);
            m.LayoutXform = MatrixFromDynamic(d.LayoutXform);
            m.LocalXform = MatrixFromDynamic(d.LocalXform);
            m.RenderXform = MatrixFromDynamic(d.RenderXform);
            return m;
        }

        private static Rect RectFromDynamic(dynamic d)
        {
            if (d == null)
                return default(Rect);
            var r = new Rect();
            r.X = d.X;
            r.Y = d.Y;
            r.Width = d.Width;
            r.Height = d.Height;
            return r;
        }
        private static Point PointFromDynamic(dynamic d)
        {
            if (d == null)
                return default(Point);
            var p = new Point();
            p.X = d.X;
            p.Y = d.Y;
            return p;
        }
        private static Size SizeFromDynamic(dynamic d)
        {
            if (d == null)
                return default(Size);
            var s = new Size();
            s.Width = d.Width;
            s.Height = d.Height;
            return s;
        }
        private static double[] MatrixFromDynamic(dynamic d)
        {
            if (d == null)
                return null;
            var list = new System.Collections.Generic.List<double>();
            foreach (double num in d)
            {
                list.Add(num);
            }
            return list.ToArray();
        }
    }
}