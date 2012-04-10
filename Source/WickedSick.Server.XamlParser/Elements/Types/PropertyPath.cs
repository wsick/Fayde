using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class PropertyPath : IJsonSerializable
    {
        public string Path { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new _PropertyPath(\"{0}\")", Path);
        }
    }
}
