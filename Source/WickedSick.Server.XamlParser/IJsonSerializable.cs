using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser
{
    public interface IJsonSerializable
    {
        string toJson(int tabIndents);
    }
}
