using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.VSM
{
    [Element]
    public class VisualStateGroup: DependencyObject
    {
        private IList<VisualState> _visualStates = new List<VisualState>();
        [Content]
        public IList<VisualState> VisualStates
        {
            get { return _visualStates; }
        }
    }
}
