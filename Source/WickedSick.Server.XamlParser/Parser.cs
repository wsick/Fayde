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
                PropertyInfo pi = FindProperty(a.Name, t);
                if (pi == null)
                    throw new Exception(string.Format("An unexpected attribute was found. {0}", a.Name));

                SetProperty(element, pi, a.Value);
            }

            //if type contains a content property (marked with content attribute), then parse the child nodes
            //if no content property but child nodes exist, throw error
            PropertyInfo cp = GetContentProperty(t);
            //if (cp == null && node.ChildNodes.Count > 0)
                //throw new Exception(string.Format("Child nodes exist, however, the element [{0}] has not been marked to contain content.", t.Name));
            ProcessChildNodes(node.ChildNodes, element, cp);

            return element;
        }

        private static void ProcessChildNodes(XmlNodeList children, DependencyObject element, PropertyInfo cp)
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
                        PropertyInfo subp = FindProperty(parts[1], element.GetType());
                        if (n.NodeType == XmlNodeType.Text)
                        {
                            //this sub-property is a string
                            SetProperty(element, subp, n.InnerText);
                        }
                        else if (subp.PropertyType.IsGenericType && subp.PropertyType.GetGenericTypeDefinition() == typeof(IList<>))
                        {
                            //this sub-property has children
                            ProcessChildNodes(n.ChildNodes, element, subp);
                        }
                        else
                        {
                            //this sub-property is a single object, set the value
                            MethodInfo mi = subp.GetSetMethod();
                            if (n.FirstChild.NodeType == XmlNodeType.Text)
                            {
                                mi.Invoke(element, new object[] { n.FirstChild.InnerText });
                            }
                            else
                            {
                                DependencyObject prop = ParseXmlNode(n.FirstChild, element);
                                mi.Invoke(element, new object[] { prop });
                            }
                        }
                    }
                }
                else
                {
                    //parsing a child element
                    if (n.NodeType == XmlNodeType.Text)
                    {
                        PropertyInfo subp = GetContentProperty(element.GetType());
                        SetProperty(element, subp, n.InnerText);
                    }
                    else
                    {
                        DependencyObject content = ParseXmlNode(n, element);
                        if (cp.PropertyType.IsGenericType && cp.PropertyType.GetGenericTypeDefinition() == typeof(IList<>))
                        {
                            //the content property is a list so add to the list
                            IList list = (IList)cp.GetValue(element, null);
                            list.Add(content);
                        }
                        else
                        {
                            //the content property is a single object, set the value
                            MethodInfo mi = cp.GetSetMethod();
                            mi.Invoke(element, new object[] { content });
                        }
                    }
                }
            }
        }

        private static void SetProperty(DependencyObject element, PropertyInfo pi, object value)
        {
            TypeConverterAttribute converter = null;
            TypeConverterAttribute[] atts = (TypeConverterAttribute[])pi.GetCustomAttributes(typeof(TypeConverterAttribute), false);
            if (atts.Count() > 1)
                throw new Exception("More than one TypeConverterAttribute may not be placed on a property.");
            if (atts.Count() == 1)
            {
                converter = atts[0];
            }

            if (converter != null)
                value = converter.Convert(element, pi, (string)value);
            MethodInfo mi = pi.GetSetMethod();
            mi.Invoke(element, new object[] { value });
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

        internal static PropertyInfo FindProperty(string attributeName, Type t)
        {
            foreach (PropertyInfo pi in t.GetProperties())
            {
                PropertyAttribute[] atts = (PropertyAttribute[])pi.GetCustomAttributes(typeof(PropertyAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one PropertyAttribute may not be placed on a property.");
                if (atts.Count() == 1)
                {
                    if (atts[0].PropertyName == null)
                    {
                        if (pi.Name.Equals(attributeName)) return pi;
                    }
                    else if (atts[0].PropertyName.Equals(attributeName)) return pi;
                }
            }
            return null;
        }

        internal static PropertyInfo GetContentProperty(Type t)
        {
            foreach (PropertyInfo pi in t.GetProperties())
            {
                ContentAttribute[] atts = (ContentAttribute[])pi.GetCustomAttributes(typeof(ContentAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one ContentAttribute may not be placed on a property.");
                if (atts.Count() == 1) return pi;
            }
            return null;
        }
    }
}
