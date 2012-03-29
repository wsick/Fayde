using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Reflection;
using System.Text.RegularExpressions;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class DependencyObject : IJsonSerializable
    {
        private IList<AttachedProperty> _attachedProperties = new List<AttachedProperty>();
        public IList<AttachedProperty> AttachedProperties
        {
            get { return _attachedProperties; }
        }

        private static IDictionary<Type, ITypeConverter> _converters = new Dictionary<Type, ITypeConverter>();
        static DependencyObject()
        {
            var converters = from t in Assembly.GetCallingAssembly().GetTypes()
                             where typeof(ITypeConverter).IsAssignableFrom(t)
                             && !t.IsInterface
                             select t;

            foreach (Type t in converters)
            {
                ITypeConverter tc = (ITypeConverter)Activator.CreateInstance(t);
                _converters.Add(tc.ConversionType, tc);
            }
        }

        private IDictionary<PropertyDescription, object> _dependencyValues = new Dictionary<PropertyDescription, object>();
        public void SetValue(string name, string value)
        {
            //first check to see if it is a dependency property
            PropertyDescription dp = PropertyDescription.Get(name, GetType());
            if (dp == null)
                throw new ArgumentException(string.Format("An unregistered dependency property/dependency object set has been passed. {0}.{1}", GetType().Name, name));

            if (_dependencyValues.ContainsKey(dp))
                throw new Exception(string.Format("The dependency property value has already been set. {0}.{1}", GetType().Name, name));

            object newValue = value;
            if (_converters.ContainsKey(dp.Type))
            {
                ITypeConverter tc = _converters[dp.Type];
                newValue = tc.Convert(value);
            }

            _dependencyValues.Add(dp, newValue);
        }

        public void SetValue(string name, object value)
        {
            PropertyDescription dp = PropertyDescription.Get(name, GetType());
            IList valueList;
            if (_dependencyValues.ContainsKey(dp))
            {
                valueList = (IList)_dependencyValues[dp];
            }
            else
            {
                valueList = (IList)Activator.CreateInstance(dp.Type);
                _dependencyValues.Add(dp, valueList);
            }
            valueList.Add(value);
        }

        public object GetValue(string name)
        {
            PropertyDescription dp = PropertyDescription.Get(name, GetType());
            if (dp == null) return null;
            if (!_dependencyValues.ContainsKey(dp))
                return null;
            return _dependencyValues[dp];
        }

        public void AddContent(object value)
        {
            //if type contains a content property (marked with content attribute), then parse the child nodes
            //if no content property but child nodes exist, throw error
            //PropertyInfo cp = GetContentProperty(t);
            //if (cp == null && node.ChildNodes.Count > 0)
            //throw new Exception(string.Format("Child nodes exist, however, the element [{0}] has not been marked to contain content.", t.Name));

            PropertyDescription contentProperty = PropertyDescription.GetContent(GetType());
            //TODO: check and make sure the property type is correct
            if (contentProperty.Type.IsGenericType && contentProperty.Type.GetGenericTypeDefinition() == typeof(List<>))
            {
                if (!_dependencyValues.Keys.Contains(contentProperty))
                {
                    object list = Activator.CreateInstance(contentProperty.Type);
                    _dependencyValues.Add(contentProperty, list);
                }
                ((IList)_dependencyValues[contentProperty]).Add(value);
            }
            else
            {
                if (_dependencyValues.Keys.Contains(contentProperty))
                    throw new Exception(string.Format("The content property value has already been set. {0}.{1}", GetType().Name, contentProperty.Name));

                _dependencyValues.Add(contentProperty, value);
            }
        }

        public static readonly PropertyDescription Name = PropertyDescription.Register("Name", typeof(string), typeof(DependencyObject));
        public DependencyObject Parent { get; set; }

        private IDictionary<string, object> GetProperties()
        {
            IDictionary<string, object> properties = new Dictionary<string, object>();
            foreach (PropertyDescription dp in _dependencyValues.Keys)
            {
                if (!dp.IsContent || _dependencyValues[dp] is string)
                {
                    properties.Add(dp.Name, _dependencyValues[dp]);
                }
            }
            return properties;
        }

        private IList GetChildren()
        {
            PropertyDescription dp = PropertyDescription.GetContent(GetType());
            if (dp == null)
                return null;
            if (!dp.Type.IsGenericType || !(dp.Type.GetGenericTypeDefinition() == typeof(List<>)))
                return null;
            return (IList)_dependencyValues[dp];
        }

        private IJsonSerializable GetContent()
        {
            PropertyDescription dp = PropertyDescription.GetContent(GetType());
            if (dp == null)
                return null;
            if (dp.Type.IsGenericType && dp.Type.GetGenericTypeDefinition() ==  typeof(List<>))
                return null;
            if (!_dependencyValues.ContainsKey(dp))
                return null;
            object value = _dependencyValues[dp];
            if (value is IJsonSerializable)
                return (IJsonSerializable)value;
            else
                return null;
        }

        public virtual string toJson(int tabIndent)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine(string.Format("Type: {0},", GetTypeName()));
            string name = GetValue("Name") as string;
            if (name != null)
            {
                sb.Append(string.Format("Name: {0},", name));
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

            IList children = GetChildren();
            if (children != null && children.Count > 0)
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
            var elAttr = GetType()
                .GetCustomAttributes(typeof(ElementAttribute), true)
                .OfType<ElementAttribute>()
                .FirstOrDefault();
            if (elAttr == null || string.IsNullOrWhiteSpace(elAttr.NullstoneName))
                return GetType().Name;
            return elAttr.NullstoneName;
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
                    string typeName = (string)((Style)this.Parent).GetValue("TargetType");
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
    }
}
