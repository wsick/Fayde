using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Documents
{
    public class Run : Inline
    {
        public static readonly PropertyDescription TextProperty = PropertyDescription.Register("Text", typeof(string), typeof(Run), true);
    }
}