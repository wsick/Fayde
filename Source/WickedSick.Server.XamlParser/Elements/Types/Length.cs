using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Length : IJsonConvertible
    {
        public double? Value { get; set; }

        public Length()
        {
            Value = null;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return Value.ToString();
        }
    }
}
