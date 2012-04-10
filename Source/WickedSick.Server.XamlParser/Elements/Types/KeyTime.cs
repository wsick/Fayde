using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public enum KeyTimeType
    {
        TimeSpan = 2,
        Uniform = 0
    }

    public class KeyTime : IJsonSerializable
    {
        public KeyTimeType Type { get; set; }
        public TimeSpan TimeSpan { get; set; }
        public KeyTime Uniform { get; set; }

        public string toJson(int tabIndents)
        {
            if (Type == KeyTimeType.Uniform)
                return "new KeyTime(Uniform)";
            else
                return string.Format("new KeyTime({0})", TimeSpan.toJson(tabIndents));
        }
    }

}
