using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class FontSize : IJsonSerializable
    {
        private int _size;

        public FontSize(int size)
        {
            _size = size;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("\"{0}px\"", _size);
        }
    }

}
