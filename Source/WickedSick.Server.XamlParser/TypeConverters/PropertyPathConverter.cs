using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class PropertyPath : IJsonSerializable
    {
        public string Path { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new _PropertyPath(\"{0}\")", Path);
        }
    }

    public class PropertyPathConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PropertyPath); }
        }

        public object Convert(string from)
        {
            return new PropertyPath() { Path = from };
        }
    }
}
