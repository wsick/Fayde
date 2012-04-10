using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Thickness : IJsonSerializable
    {
        public double Left { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new Thickness({0}, {1}, {2}, {3})", Left, Top, Right, Bottom);
        }
    }
}
