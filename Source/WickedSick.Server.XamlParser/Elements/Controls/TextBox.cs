using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class TextBox : FrameworkElement
    {
        public static readonly PropertyDescription Text = PropertyDescription.Register("Text", typeof(string), typeof(TextBox), true);
    }
}
