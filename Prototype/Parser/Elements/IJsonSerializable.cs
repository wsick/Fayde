using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public interface IJsonSerializable
    {
        string toJson(int tabIndents);
    }
}
