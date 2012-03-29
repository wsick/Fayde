using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser
{
    public static class Parser
    {
        public static DependencyObject ParseXmlNode(XmlNode node, DependencyObject parent)
        {
            Type t = GetElementType(node.Name);
            if (t == null)
                throw new Exception("Unknown element: " + node.Name);
            DependencyObject element = (DependencyObject)Activator.CreateInstance(t);
            element.Parent = parent;

            foreach (XmlAttribute a in node.Attributes)
            {
                if (a.Name.Contains(":"))
                    continue;
                if (a.Name.Contains("."))
                {
                    //inline attached property
                    string[] parts = a.Name.Split('.');
                    if (parts.Count() != 2)
                        throw new Exception(string.Format("An invalid element has been encountered. {0}", a.Name));
                    AddAttachedProperty(element, parts[0], parts[1], a.Value);
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
                        throw new Exception(string.Format("An invalid element has been encountered. {0}", n.Name));
                    if (n.Attributes.Count > 0)
                        throw new Exception(string.Format("A sub-element used for setting a property can not contain attributes. {0}", n.Name));

                    if (!parts[0].Equals(element.GetType().Name))
                    {
                        //the sub-element is an attached property
                        AddAttachedProperty(element, parts[0], parts[1], n.InnerText);
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
                    }
                    if (propertyName == null)
                        element.AddContent(child);
                    else
                        element.SetValue(propertyName, child);
                }
            }
        }

        private static void AddAttachedProperty(DependencyObject element, string owner, string property, string value)
        {
            AttachedProperty ap = new AttachedProperty()
            {
                Owner = owner,
                Property = property,
                Value = value
            };
            ((UIElement)element).AttachedProperties.Add(ap);
        }

        internal static Type GetElementType(string elementName)
        {
            var types = from t in Assembly.GetAssembly(typeof(Parser)).GetTypes()
                        where t.IsClass && !t.IsAbstract
                        select t;
            foreach (Type t in types)
            {
                ElementAttribute[] atts = (ElementAttribute[])t.GetCustomAttributes(typeof(ElementAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one ElementAttribute may not be placed on a class.");
                if (atts.Count() == 1)
                {
                    if (atts[0].ElementName == null)
                    {
                        if (t.Name.Equals(elementName)) return t;
                    }
                    else if (atts[0].ElementName.Equals(elementName)) return t;
                }
            }
            return null;
        }
    }
}
