using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using Parser.TypeConverters;
using Parser.Elements;
using System.Reflection;
using System.Collections;

namespace Parser
{
    public static class Parser
    {
        public static object ParseXmlNode(XmlNode node, object parent)
        {
            Type t = GetElementType(node.Name);
            object element = Activator.CreateInstance(t);

            foreach (XmlAttribute a in node.Attributes)
            {
                if (a.Name.Contains("."))
                {
                    //inline attached property
                    string[] parts = a.Name.Split('.');
                    if (parts.Count() != 2)
                        throw new Exception(string.Format("An invalid element has been encountered. {0}", a.Name));
                    AddAttachedProperty(element, parts[0], parts[1], a.Value);
                }
                else
                {
                    //regular property
                    PropertyInfo pi = FindProperty(a.Name, t);
                    if (pi == null)
                        throw new Exception(string.Format("An unexpected attribute was found. {0}", a.Name));

                    SetProperty(element, pi, a.Value);
                }
            }

            //if type contains a content property (marked with content attribute), then parse the child nodes
            //if no content property but child nodes exist, throw error
            PropertyInfo cp = GetContentProperty(t);
            if (cp == null && node.ChildNodes.Count > 0)
                throw new Exception("Child nodes exist, however, the element has not been marked to contain content.");
            ProcessChildNodes(node.ChildNodes, element, cp);

            return element;
        }

        private static void ProcessChildNodes(XmlNodeList children, object element, PropertyInfo cp)
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
                        if (subp.PropertyType.IsGenericType && subp.PropertyType.GetGenericTypeDefinition() == typeof(IList<>))
                        {
                            //this sub-property has children
                            ProcessChildNodes(n.ChildNodes, element, subp);
                        }
                        else
                        {
                            //this sub-property is a single value
                            SetProperty(element, subp, n.InnerText);
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
                        object content = ParseXmlNode(n, element);
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

        private static void SetProperty(object element, PropertyInfo pi, object value)
        {
            TypeConverterAttribute[] atts = (TypeConverterAttribute[])pi.GetCustomAttributes(typeof(TypeConverterAttribute), false);
            if (atts.Count() > 1)
                throw new Exception("More than one TypeConverterAttribute may not be placed on a property.");
            if (atts.Count() == 1)
            {
                value = atts[0].Convert((string)value);
            }

            MethodInfo mi = pi.GetSetMethod();
            mi.Invoke(element, new object[] { value });
        }

        private static void AddAttachedProperty(object element, string owner, string property, string value)
        {
            AttachedProperty ap = new AttachedProperty()
            {
                Owner = owner,
                Property = property,
                Value = value
            };
            ((UIElement)element).AttachedProperties.Add(ap);
        }

        private static Type GetElementType(string elementName)
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

        private static PropertyInfo FindProperty(string attributeName, Type t)
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

        private static PropertyInfo GetContentProperty(Type t)
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
