using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class FontSize : IJsonConvertible
    {
        private int _size;

        public FontSize(int size)
        {
            _size = size;
        }

        public string ToJson(int tabIndents)
        {
            return string.Format("\"{0}px\"", _size);
        }
    }

}
