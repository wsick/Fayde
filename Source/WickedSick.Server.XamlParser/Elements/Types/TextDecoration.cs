using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class TextDecoration : IJsonSerializable
    {
        private string Decoration { get; set; }

        public TextDecoration(string decoration)
        {
            Decoration = decoration;
        }

        public string toJson(int tabIndents)
        {
            return Decoration;
        }
    }

}
