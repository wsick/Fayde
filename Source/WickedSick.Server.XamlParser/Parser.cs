using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Media.VSM;

namespace WickedSick.Server.XamlParser
{
    public static class Parser
    {
        public static object ParseXmlNode(XmlNode node, DependencyObject parent)
        {
            if (node.NodeType == XmlNodeType.Comment)
                return null;

            Type t = DependencyObject.GetElementType(node.NamespaceURI, node.LocalName);
            if (t == null)
                throw new XamlParseException("Unknown element: " + node.Name);
            if (t.IsEnum)
            {
                return Enum.Parse(t, node.InnerText);
            }

            DependencyObject element = (DependencyObject)Activator.CreateInstance(t);
            element.Parent = parent;

            foreach (XmlAttribute a in node.Attributes)
            {
                if (a.Name.ToLower().Equals("xmlns"))
                    continue;
                if (a.Name.Contains(":"))
                    continue;
                if (a.Name.Contains("."))
                {
                    //inline attached property
                    string[] parts = a.Name.Split('.');
                    if (parts.Count() != 2)
                        throw new XamlParseException(string.Format("An invalid element has been encountered. {0}", a.Name));

                    Type ownerType = DependencyObject.GetElementType(node.NamespaceURI, parts[0]);
                    element.AddAttachedProperty(ownerType, parts[1], a.Value);
                    continue;
                }

                if (a.Value.StartsWith("{"))
                {
                    object expression = MarkupExpressionParser.ParseExpression(a.Value);
                    element.SetValue(a.Name, expression);
                    continue;
                }

                //regular property
                element.SetValue(a.Name, a.Value);
            }

            ProcessChildNodes(node.ChildNodes, element, null);

            return element;
        }

        private static void ProcessChildNodes(XmlNodeList children, DependencyObject element, string propertyName)
        {
            foreach (XmlNode n in children)
            {
                if (n.Name.Contains("."))
                {
                    //a property has been set as a sub-element
                    string[] parts = n.Name.Split('.');
                    if (parts.Count() != 2)
                        throw new XamlParseException(string.Format("An invalid element has been encountered. {0}", n.Name));
                    if (n.Attributes.Count > 0)
                        throw new XamlParseException(string.Format("A sub-element used for setting a property can not contain attributes. {0}", n.Name));

                    if (!parts[0].Equals(element.GetType().Name))
                    {
                        //the sub-element is an attached property
                        if (n.NodeType == XmlNodeType.Text)
                        {
                            Type ownerType = DependencyObject.GetElementType(n.NamespaceURI, parts[0]);
                            element.AddAttachedProperty(ownerType, parts[1], n.InnerText);
                        }
                        else
                        {
                            ProcessChildNodes(n.ChildNodes, element, n.LocalName);
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
                            ProcessChildNodes(n.ChildNodes, element, parts[1]);
                    }
                }
                else
                {
                    //parsing a child element
                    object child = n.InnerText;
                    if (n.NodeType != XmlNodeType.Text)
                    {
                        child = ParseXmlNode(n, element);
                        if (child == null)
                            continue;
                    }
                    if (propertyName == null)
                        element.AddContent(child);
                    else if (propertyName.Contains("."))
                    {
                        string[] parts = propertyName.Split('.');
                        Type ownerType = DependencyObject.GetElementType(n.NamespaceURI, parts[0]);
                        element.AddAttachedProperty(ownerType, parts[1], child);
                    }
                    else
                        element.SetValue(propertyName, child);
                }
            }
        }
    }
}
