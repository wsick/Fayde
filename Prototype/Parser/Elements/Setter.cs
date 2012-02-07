using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    [Element]
    public class Setter: DependencyObject
    {
        [Property]
        public string TargetName { get; set; }

        [Property]
        public string Property { get; set; }

        [Property]
        public object Value { get; set; }
    }
}
