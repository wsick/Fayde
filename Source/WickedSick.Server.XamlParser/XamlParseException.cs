using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser
{
    public class XamlParseException: Exception
    {
        public XamlParseException(string message)
            : base(message)
        {
        }
    }
}
