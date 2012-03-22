using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Reflection;
using System.Text.RegularExpressions;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class DependencyObject : IJsonSerializable
    {
        private IList<AttachedProperty> _attachedProperties = new List<AttachedProperty>();
        public IList<AttachedProperty> AttachedProperties
        {
            get { return _attachedProperties; }
        }
        public string NameProperty { get; set; }
        public DependencyObject Parent { get; set; }

        private IDictionary<string, object> GetProperties()
        {
            IDictionary<string, object> properties = new Dictionary<string, object>();
            foreach (PropertyInfo pi in GetType().GetProperties())
            {
                PropertyAttribute[] atts = (PropertyAttribute[])pi.GetCustomAttributes(typeof(PropertyAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one PropertyAttribute may not be placed on a property.");
                if (atts.Count() == 1)
                {
                    string propName = atts[0].PropertyName;
                    if (propName == null)
                        propName = pi.Name;
                    object value = pi.GetValue(this, null);
                    properties.Add(propName, value);
                }
            }
            return properties;
        }

        private IList<DependencyObject> GetChildren()
        {
            IList<DependencyObject> result = new List<DependencyObject>();
            foreach (PropertyInfo pi in GetType().GetProperties())
            {
                ContentAttribute[] atts = (ContentAttribute[])pi.GetCustomAttributes(typeof(ContentAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one ContentAttribute may not be placed on any property.");
                if (atts.Count() == 1)
                {
                    if (pi.PropertyType.IsGenericType && pi.PropertyType.GetGenericTypeDefinition() == typeof(IList<>))
                    {
                        IList values = (IList)pi.GetValue(this, null);
                        foreach (DependencyObject d in values)
                        {
                            result.Add(d);
                        }
                        return result;
                    }
                }
            }
            return result;
        }

        private IJsonSerializable GetContent()
        {
            foreach (PropertyInfo pi in GetType().GetProperties())
            {
                ContentAttribute[] atts = (ContentAttribute[])pi.GetCustomAttributes(typeof(ContentAttribute), false);
                if (atts.Count() > 1)
                    throw new Exception("More than one ContentAttribute may not be placed on any property.");
                if (atts.Count() == 1)
                {
                    if (!pi.PropertyType.IsGenericType || !(pi.PropertyType.GetGenericTypeDefinition() == typeof(IList<>)))
                    {
                        object value = pi.GetValue(this, null);
                        if (value is IJsonSerializable)
                            return (IJsonSerializable)pi.GetValue(this, null);
                        else
                            return null;
                    }
                }
            }
            return null;
        }

        public virtual string toJson(int tabIndent)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine(string.Format("Type: {0},", GetTypeName()));
            if (NameProperty != null && NameProperty.Length > 0)
            {
                sb.Append(string.Format("Name: {0},", NameProperty));
            }

            IDictionary<string, object> properties = GetProperties();
            string propJson = propsToJson();
            if (propJson.Length > 0)
            {
                sb.AppendLine("Props:");
                sb.AppendLine("{");
                sb.Append(propJson);
                sb.AppendLine("},");
            }

            if (AttachedProperties.Count() > 0)
            {
                sb.AppendLine("AttachedProps: [");
                foreach (AttachedProperty ap in AttachedProperties)
                {
                    sb.Append(ap.toJson(0));
                    sb.AppendLine(",");
                }
                sb.AppendLine("],");
            }

            IList<DependencyObject> children = GetChildren();
            if (children.Count > 0)
            {
                sb.AppendLine("Children: [");
                foreach (DependencyObject d in children)
                {
                    sb.Append(d.toJson(0));
                    sb.AppendLine(",");
                }
                sb.AppendLine("],");
            }

            IJsonSerializable content = GetContent();
            if (content != null)
            {
                sb.Append("Content: ");
                sb.AppendLine(content.toJson(0));
            }

            sb.AppendLine("}");
            return sb.ToString();
        }

        protected virtual string GetTypeName()
        {
            return GetType().Name;
        }

        private string propsToJson()
        {
            StringBuilder sb = new StringBuilder();
            IDictionary<string, object> properties = GetProperties();
            foreach (string propName in properties.Keys)
            {
                object value = properties[propName];
                if (value == null) continue;

                if (this is Setter && propName.Equals("Property"))
                {
                    string typeName = ((Style)this.Parent).TargetType;
                    sb.Append(propName);
                    sb.Append(": ");
                    sb.Append(string.Format("DependencyProperty.GetDependencyProperty({0}, \"{1}\")", typeName, value));
                    sb.AppendLine(",");
                    continue;
                }
                
                if (value is IJsonSerializable)
                {
                    sb.Append(propName);
                    sb.Append(": ");
                    sb.Append(((IJsonSerializable)value).toJson(0));
                    sb.AppendLine(",");
                    continue;
                }
                
                if (typeof(IList).IsAssignableFrom(value.GetType()))
                {
                    string json = listpropToJson((IList)value);
                    if (json.Length > 0)
                    {
                        sb.Append(propName);
                        sb.AppendLine(": [");
                        sb.Append(json);
                        sb.Append("],");
                    }
                    continue;
                }

                sb.Append(propName);
                sb.Append(": ");
                if (value is string)
                    sb.Append("\"");
                sb.Append(CleanseText(value.ToString()));
                if (value is string)
                    sb.Append("\"");
                sb.AppendLine(",");
            }
            return sb.ToString();
        }

        private static string CleanseText(string s)
        {
            if (string.IsNullOrWhiteSpace(s))
                return s;
            var cur = s;
            cur = Regex.Replace(cur, "\\r\\n\\s*", " ");
            cur = Regex.Replace(cur, "\\n\\s*", " ");
            cur = Regex.Replace(cur, "\\r\\s*", " ");
            cur = Regex.Replace(cur, "  ", " ");
            return cur.Trim();
        }

        private string listpropToJson(IList values)
        {
            StringBuilder sb = new StringBuilder();
            foreach (DependencyObject d in values)
            {
                sb.Append(d.toJson(0));
                sb.AppendLine(",");
            }
            return sb.ToString();
        }

        [Property]
        public string Name { get; set; }
    }
}
