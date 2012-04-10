using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Point : IJsonSerializable
    {
        public double X { get; set; }
        public double Y { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new Point({0}, {1})", X, Y);
        }
    }
}
