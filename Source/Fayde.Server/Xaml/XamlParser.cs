using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml;
using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Xaml
{
    public class XamlParser
    {
        public XamlParser(Assembly resolveAssembly)
        {
            TypeResolver = new TypeResolver(resolveAssembly);
        }
        public TypeResolver TypeResolver { get; protected set; }

        public static IParseResult ParseApp(string filepath, Assembly resolveAssembly)
        {
            var parser = new XamlParser(resolveAssembly);
            return parser.Parse(filepath);
        }

        public IParseResult Parse(string filepath)
        {
            var doc = new XmlDocument();
            doc.Load(filepath);
            var result = new ParseResult { Metadata = new ParseMetadata() };
            var metadata = new ParseMetadata();
            result.RootObject = (DependencyObject)ParseXmlNode(doc.DocumentElement, null, result.Metadata);
            return result;
        }
        public IParseResult Parse(Stream stream)
        {
            var doc = new XmlDocument();
            doc.Load(stream);
            var result = new ParseResult { Metadata = new ParseMetadata() };
            var metadata = new ParseMetadata();
            result.RootObject = (DependencyObject)ParseXmlNode(doc.DocumentElement, null, result.Metadata);
            return result;
        }
        public IParseResult ParseXml(string xml)
        {
            var doc = new XmlDocument();
            doc.LoadXml(xml);
            var result = new ParseResult { Metadata = new ParseMetadata() };
            var metadata = new ParseMetadata();
            result.RootObject = (DependencyObject)ParseXmlNode(doc.DocumentElement, null, result.Metadata);
            return result;
        }

        private object ParseXmlNode(XmlNode node, DependencyObject parent, IParseMetadata parseMetadata)
        {
            if (node.NodeType == XmlNodeType.Comment)
                return null;

            Type t = ResolveType(node.NamespaceURI, node.LocalName, parseMetadata);
            if (t == null)
                throw new XamlParseException("Unknown element: " + node.LocalName);
            if (t.IsEnum)
            {
                return Enum.Parse(t, node.InnerText);
            }

            object obj = Activator.CreateInstance(t);
            if (obj is DependencyObject)
            {
                DependencyObject element = obj as DependencyObject;
                if (element is FaydeApplication)
                    (element as FaydeApplication).Parser = this;
                element.Parent = parent;

                foreach (XmlAttribute a in node.Attributes)
                {
                    if (a.Name == "x:Key")
                    {
                        element.SetValue("Key", a.Value);
                        continue;
                    }
                    if (a.Name == "x:Name")
                    {
                        element.SetValue("Name", a.Value);
                        continue;
                    }

                    if (a.Name.ToLower().Equals("xmlns"))
                        continue;
                    if (a.Name.Contains(":"))
                        continue;
                    if (a.Name.Contains("."))
                    {
                        //inline attached property
                        string[] parts = a.LocalName.Split('.');
                        if (parts.Count() != 2)
                            throw new XamlParseException(string.Format("An invalid element has been encountered. {0}", a.Name));

                        var nsUri = a.NamespaceURI;
                        if (string.IsNullOrWhiteSpace(nsUri))
                            nsUri = a.OwnerElement.NamespaceURI;

                        Type ownerType = ResolveType(nsUri, parts[0], parseMetadata);
                        element.AddAttachedProperty(ownerType, parts[1], a.Value);
                        continue;
                    }

                    if (a.Value.StartsWith("{"))
                    {
                        MarkupExpressionParser mep = new MarkupExpressionParser(a.Value);
                        object expression = mep.ParseExpression();
                        element.SetValue(a.Name, expression);
                        continue;
                    }

                    //regular property
                    element.SetValue(a.Name, a.Value);
                }

                ProcessChildNodes(node.ChildNodes, element, null, parseMetadata);
            }
            else
            {
                foreach (XmlAttribute a in node.Attributes)
                {
                    try
                    {
                        PropertyHelper.SetProperty(obj, a.Name, a.Value);
                    }
                    catch (MemberAccessException)
                    {
                        throw new XamlParseException(string.Format("An invalid property has been encountered. {0}.{1}", node.LocalName, a.Name));
                    }
                    catch (FormatException)
                    {
                        throw new XamlParseException(string.Format("An invalid value format has been encountered ({0}). {1}.{2}", node.LocalName, a.Name, a.Value));
                    }
                }
            }

            return obj;
        }
        private void ProcessChildNodes(XmlNodeList children, DependencyObject element, string propertyName, IParseMetadata parseMetadata)
        {
            foreach (XmlNode n in children)
            {
                if (n.LocalName.Contains("."))
                {
                    //a property has been set as a sub-element
                    string[] parts = n.LocalName.Split('.');
                    if (parts.Count() != 2)
                        throw new XamlParseException(string.Format("An invalid element has been encountered. {0}", n.LocalName));
                    if (n.Attributes.Count > 0)
                        throw new XamlParseException(string.Format("A sub-element used for setting a property can not contain attributes. {0}", n.LocalName));

                    if (!parts[0].Equals(element.GetType().Name))
                    {
                        //the sub-element is an attached property
                        if (n.NodeType == XmlNodeType.Text)
                        {
                            Type ownerType = ResolveType(n.NamespaceURI, parts[0], parseMetadata);
                            element.AddAttachedProperty(ownerType, parts[1], n.InnerText);
                        }
                        else
                        {
                            ProcessChildNodes(n.ChildNodes, element, n.LocalName, parseMetadata);
                        }
                    }
                    else
                    {
                        //the sub-element is a regular property
                        if (n.NodeType == XmlNodeType.Text)
                        {
                            //this sub-property is a string
                            element.SetValue(parts[1], n.InnerText);
                        }
                        else
                        {
                            ProcessChildNodes(n.ChildNodes, element, parts[1], parseMetadata);
                        }
                    }
                }
                else
                {
                    //parsing a child element
                    object child = n.InnerText;
                    if (n.NodeType != XmlNodeType.Text)
                    {
                        child = ParseXmlNode(n, element, parseMetadata);
                        if (child == null)
                            continue;
                    }
                    if (propertyName == null)
                        element.AddContent(child);
                    else if (propertyName.Contains("."))
                    {
                        string[] parts = propertyName.Split('.');
                        Type ownerType = ResolveType(n.NamespaceURI, parts[0], parseMetadata);
                        element.AddAttachedProperty(ownerType, parts[1], child);
                    }
                    else
                        element.SetValue(propertyName, child);
                }
            }
        }

        private Type ResolveType(string xmlNamespace, string localName, IParseMetadata parseMetadata)
        {
            var type = TypeResolver.GetElementType(xmlNamespace, localName);
            if (type == null)
            {
                throw new Exception(string.Format("Could not resolve type: '{0}' [{1}].", localName, xmlNamespace));
            }
            if (type.Assembly != Assembly.GetExecutingAssembly())
                parseMetadata.AddParseDependency(xmlNamespace, localName);
            return type;
        }
    }
}