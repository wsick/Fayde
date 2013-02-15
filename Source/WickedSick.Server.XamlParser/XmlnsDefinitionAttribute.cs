using System;

namespace WickedSick.Server.XamlParser
{
    [AttributeUsage(AttributeTargets.Assembly)]
    public class XmlnsDefinitionAttribute : Attribute
    {
        public XmlnsDefinitionAttribute(string xmlNamespace, string clrNamespace)
        {
            XmlNamespace = xmlNamespace;
            ClrNamespace = clrNamespace;
        }

        public string XmlNamespace { get; set; }
        public string ClrNamespace { get; set; }
    }
}