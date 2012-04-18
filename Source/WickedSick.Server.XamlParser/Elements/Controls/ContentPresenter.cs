using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ContentPresenter: FrameworkElement
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(object), typeof(ContentPresenter), true);
        public static readonly PropertyDescription ContentTemplate = PropertyDescription.Register("ContentTemplate", typeof(DataTemplate), typeof(ContentPresenter));
    }
}