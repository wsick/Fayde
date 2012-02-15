using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class Style: DependencyObject
    {
        [Property]
        public string TargetType { get; set; }

        private IList<Setter> _setters = new List<Setter>();
        [Content]
        public IList<Setter> Setters
        {
            get { return _setters; }
        }
    }
}
