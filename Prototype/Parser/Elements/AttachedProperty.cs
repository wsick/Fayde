using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public class AttachedProperty: IJsonSerializable
    {
        public string Owner { get; set; }
        public string Property { get; set; }
        public string Value { get; set; }

        public string toJson(int tabIndents)
        {
            throw new NotImplementedException();
        }
    }
}
