using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Boolean: DependencyObject
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(string), typeof(Boolean), true);

        public override string toJson(int tabIndent)
        {
            return ((string)GetValue("Content")).ToLower();
        }
    }
}
