using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests
{
    public partial class MainPage : UserControl
    {
        public MainPage()
        {
            InitializeComponent();
            Loaded += MainPage_Loaded;
            LayoutUpdated += MainPage_LayoutUpdated;
        }

        void MainPage_LayoutUpdated(object sender, EventArgs e)
        {
            var node = new FENode(this);
            FindElsWithLayoutClip();
        }

        private void MainPage_Loaded(object sender, RoutedEventArgs e)
        {

        }

        public void FindElsWithLayoutClip()
        {
            foreach (var fe in FENode.Flatten(new FENode(this)))
            {
                var lc = LayoutInformation.GetLayoutClip(fe);
                var ls = LayoutInformation.GetLayoutSlot(fe);
            }
        }
    }

    public class FENode
    {
        public FrameworkElement _Element { get; set; }

        public FENode(FrameworkElement element)
        {
            _Element = element;
        }

        public List<FENode> Children
        {
            get
            {
                var list = new List<FENode>();
                for (var i = 0; i < VisualTreeHelper.GetChildrenCount(this._Element); i++)
                {
                    var child = (FrameworkElement)VisualTreeHelper.GetChild(this._Element, i);
                    list.Add(new FENode(child));
                }
                return list;
            }
        }

        public static IEnumerable<FrameworkElement> Flatten(FENode node)
        {
            yield return node._Element;
            foreach (var child in node.Children)
            {
                foreach (var granchild in Flatten(child))
                {
                    yield return granchild;
                }
            }
        }
    }
}