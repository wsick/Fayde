using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Windows;
using Newtonsoft.Json;

namespace WickedSick.Thea.Models
{
    public class LayoutMetrics
    {
        public LayoutMetrics()
        {
            Properties = new ObservableCollection<KeyValuePair<string, object>>();
        }

        public double? ActualHeight { get; set; }
        public double? ActualWidth { get; set; }

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

        public double? TotalOpacity { get; set; }
        public bool TotalIsRenderVisible { get; set; }
        public bool TotalIsHitTestVisible { get; set; }
        public bool TotalRenderProjection { get; set; }

        public ObservableCollection<KeyValuePair<string, object>> Properties { get; protected set; }

        public static LayoutMetrics FromJson(string json)
        {
            var js = JsonConvert.DeserializeObject<JsLayoutMetrics>(json);
            var lm = js.ToClr();
            lm.InitProps();
            return lm;
        }

        protected void InitProps()
        {
            Properties.Clear();

            Properties.Add(new KeyValuePair<string, object>("ActualWidth", ActualWidth));
            Properties.Add(new KeyValuePair<string, object>("ActualHeight", ActualHeight));

            Properties.Add(new KeyValuePair<string, object>("LayoutSlot", LayoutSlot));
            Properties.Add(new KeyValuePair<string, object>("VisualOffset", VisualOffset));
            Properties.Add(new KeyValuePair<string, object>("LayoutClip", LayoutClip));

            Properties.Add(new KeyValuePair<string, object>("HiddenDesire", HiddenDesire));
            Properties.Add(new KeyValuePair<string, object>("DesiredSize", DesiredSize));
            Properties.Add(new KeyValuePair<string, object>("RenderSize", RenderSize));

            Properties.Add(new KeyValuePair<string, object>("AbsoluteXform", string.Join(",", AbsoluteXform)));
            Properties.Add(new KeyValuePair<string, object>("LayoutXform", string.Join(",", LayoutXform)));
            Properties.Add(new KeyValuePair<string, object>("LocalXform", string.Join(",", LocalXform)));
            Properties.Add(new KeyValuePair<string, object>("RenderXform", string.Join(",", RenderXform)));

            Properties.Add(new KeyValuePair<string, object>("TotalOpacity", TotalOpacity));
            Properties.Add(new KeyValuePair<string, object>("TotalIsRenderVisible", TotalIsRenderVisible));
            Properties.Add(new KeyValuePair<string, object>("TotalIsHitTestVisible", TotalIsHitTestVisible));
            Properties.Add(new KeyValuePair<string, object>("TotalRenderProjection", TotalRenderProjection));
        }
    }

    internal class JsLayoutMetrics
    {
        public LayoutMetrics ToClr()
        {
            return new LayoutMetrics
            {
                ActualHeight = ActualHeight,
                ActualWidth = ActualWidth,

                LayoutSlot = LayoutSlot.ToClr(),
                VisualOffset = VisualOffset.ToClr(),
                LayoutClip = LayoutClip.ToClr(),

                HiddenDesire = HiddenDesire.ToClr(),
                DesiredSize = DesiredSize.ToClr(),
                RenderSize = RenderSize.ToClr(),

                AbsoluteXform = AbsoluteXform,
                LayoutXform = LayoutXform,
                LocalXform = LocalXform,
                RenderXform = RenderXform,

                TotalOpacity = TotalOpacity,
                TotalIsRenderVisible = TotalIsRenderVisible,
                TotalIsHitTestVisible = TotalIsHitTestVisible,
                TotalRenderProjection = TotalRenderProjection,
            };
        }

        [JsonProperty("ActualHeight")]
        public double? ActualHeight { get; set; }
        [JsonProperty("ActualWidth")]
        public double? ActualWidth { get; set; }

        [JsonProperty("LayoutSlot")]
        public JsRect LayoutSlot { get; set; }
        [JsonProperty("VisualOffset")]
        public JsPoint VisualOffset { get; set; }
        [JsonProperty("LayoutClip")]
        public JsRect LayoutClip { get; set; }

        [JsonProperty("HiddenDesire")]
        public JsSize HiddenDesire { get; set; }
        [JsonProperty("DesiredSize")]
        public JsSize DesiredSize { get; set; }
        [JsonProperty("RenderSize")]
        public JsSize RenderSize { get; set; }

        [JsonProperty("AbsoluteXform")]
        public double[] AbsoluteXform { get; set; }
        [JsonProperty("LayoutXform")]
        public double[] LayoutXform { get; set; }
        [JsonProperty("LocalXform")]
        public double[] LocalXform { get; set; }
        [JsonProperty("RenderXform")]
        public double[] RenderXform { get; set; }

        [JsonProperty("TotalOpacity")]
        public double? TotalOpacity { get; set; }
        [JsonProperty("TotalIsRenderVisible")]
        public bool TotalIsRenderVisible { get; set; }
        [JsonProperty("TotalIsHitTestVisible")]
        public bool TotalIsHitTestVisible { get; set; }
        [JsonProperty("TotalRenderProjection")]
        public bool TotalRenderProjection { get; set; }
    }

    internal struct JsPoint
    {
        [JsonProperty("X")]
        public double X { get; set; }
        [JsonProperty("Y")]
        public double Y { get; set; }

        public Point ToClr()
        {
            return new Point
            {
                X = X,
                Y = Y,
            };
        }
    }

    internal struct JsSize
    {
        [JsonProperty("Width", NullValueHandling = NullValueHandling.Ignore)]
        public double Width { get; set; }
        [JsonProperty("Height", NullValueHandling = NullValueHandling.Ignore)]
        public double Height { get; set; }

        public Size ToClr()
        {
            return new Size
            {
                Width = Width,
                Height = Height,
            };
        }
    }

    internal struct JsRect
    {
        [JsonProperty("X")]
        public double X { get; set; }
        [JsonProperty("Y")]
        public double Y { get; set; }
        [JsonProperty("Width")]
        public double Width { get; set; }
        [JsonProperty("Height")]
        public double Height { get; set; }

        public Rect ToClr()
        {
            return new Rect
            {
                X = X,
                Y = Y,
                Width = Width,
                Height = Height,
            };
        }
    }
}