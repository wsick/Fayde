using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests.Tests
{
    public partial class TransformTest : UserControl
    {
        public TransformTest()
        {
            InitializeComponent();
            Test();
        }

        private void Test()
        {
            var test = new TransformGroup
            {
                Children = new TransformCollection
                {
                    new TranslateTransform { X = 10, Y = 20 },
                    new RotateTransform { Angle = 45 }
                }
            };
            var v = test.Value;


            var st = new TransformGroup { Children = new TransformCollection { new SkewTransform { AngleX = 45 } } };
            var tt = new TranslateTransform { X = 1 };

            var tg1 = new TransformGroup { Children = new TransformCollection { st, tt } };
            var tg2 = new TransformGroup { Children = new TransformCollection { tt, st } };

            var tg3 = new TransformGroup { Children = new TransformCollection { st } };
            var tg4 = new TransformGroup { Children = new TransformCollection { tt } };

            var tg5 = new TransformGroup();
            tg5.Children.Add(new TranslateTransform { X = 1, Y = 2 });
            tg5.Children.Add(new RotateTransform { Angle = -90 });

            var tg6 = new TransformGroup();
            tg6.Children.Add(new RotateTransform { Angle = -90 });
            tg6.Children.Add(new TranslateTransform { X = 1, Y = 2 });

            var p = new RotateTransform { Angle = 90 }.Transform(new Point(1, 2));

            var m3 = new Matrix3DProjection();
        }
    }
}
