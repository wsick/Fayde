using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum, AllowMultiple=false)]
    public sealed class ElementAttribute : Attribute
    {
        public ElementAttribute()
        {
        }

        public string NullstoneName { get; set; }
    }
}
