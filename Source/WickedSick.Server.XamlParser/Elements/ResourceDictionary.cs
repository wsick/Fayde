using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class ResourceDictionary: DependencyObject
    {
        public static readonly PropertyDescription Resources = PropertyDescription.Register("Resources", typeof(List<DependencyObject>), typeof(ResourceDictionary), true);
    }
}
