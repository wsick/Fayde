using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Reflection;
using System.Text.RegularExpressions;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;
using log4net;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class DependencyObject : IJsonConvertible
    {
        static readonly ILog Log = LogManager.GetLogger(typeof(DependencyObject));

        private static IDictionary<Type, ITypeConverter> _converters = new Dictionary<Type, ITypeConverter>();
        public static Type GetElementType(string nameSpace, string elementName)
        {
            string[] nsParts = nameSpace.Split(';');

            var types = from t in Assembly.Load(nsParts[0]).GetTypes()
                        where !t.IsAbstract && t.Namespace != null && t.Namespace.StartsWith(nsParts[1])
                        select t;
            foreach (Type t in types)
            {
                if (t.Name.Equals(elementName)) return t;
            }
            return null;
        }

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

            new Elements.Media.VSM.VisualStateManager();
            new Elements.ToolTipService();
            new Elements.Controls.Canvas();
        }
        
        private IDictionary<AttachedPropertyDescription, object> _attachedValues = new Dictionary<AttachedPropertyDescription, object>();
        private IDictionary<PropertyDescription, object> _dependencyValues = new Dictionary<PropertyDescription, object>();

        public void SetValue(string name, object value)
        {
            //first check to see if the property is defined
            PropertyDescription pd = PropertyDescription.Get(name, GetType());
            if (pd == null)
                throw new ArgumentException(string.Format("An unregistered property has been passed. {0}.{1}", GetType().Name, name));

            if (IsSubclassOfRawGeneric(pd.Type, typeof(DependencyObjectCollection<>)))
            {
                DependencyObject doc;
                if (_dependencyValues.ContainsKey(pd))
                {
                    doc = (DependencyObject)_dependencyValues[pd];
                }
                else
                {
                    doc = (DependencyObject)Activator.CreateInstance(pd.Type);
                    _dependencyValues.Add(pd, doc);
                }

                Type elementType = null;
                if (doc is IElementTypeable)
                    elementType = (doc as IElementTypeable).ElementType;
                else if (pd.Type.IsGenericType)
                    elementType = pd.Type.GetGenericArguments()[0];
                if (value is string && elementType != typeof(string))
                {
                    value = GetConvertedValue((string)value, elementType);
                }
                doc.AddContent(value);
            }
            else
            {
                if (_dependencyValues.ContainsKey(pd))
                    throw new Exception(string.Format("The property has already been set. {0}.{1}", GetType().Name, name));

                if (value is string)
                {
                    value = GetConvertedValue((string)value, pd.Type);
                }

                _dependencyValues.Add(pd, value);
            }
        }

        private object GetConvertedValue(string value, Type convertedType)
        {
            if (convertedType.IsEnum)
            {
                return Enum.Parse(convertedType, (string)value);
            }
            else if (_converters.ContainsKey(convertedType))
            {
                ITypeConverter tc = _converters[convertedType];
                return tc.Convert((string)value);
            }
            return value;
        }

        public object GetValue(string name)
        {
            PropertyDescription pd = PropertyDescription.Get(name, GetType());
            if (pd == null) return null;
            if (!_dependencyValues.ContainsKey(pd))
                return null;
            return _dependencyValues[pd];
        }

        public virtual void AddContent(object value)
        {
            //if type contains a content property (marked with content attribute), then parse the child nodes
            //if no content property but child nodes exist, throw error
            //PropertyInfo cp = GetContentProperty(t);
            //if (cp == null && node.ChildNodes.Count > 0)
            //throw new Exception(string.Format("Child nodes exist, however, the element [{0}] has not been marked to contain content.", t.Name));

            PropertyDescription contentProperty = PropertyDescription.GetContent(GetType());
            //TODO: check and make sure the property type is correct
            if (contentProperty == null)
                throw new XamlParseException(string.Format("Content cannot be added to an element with no content property definition. {0}", GetType().Name));
            
            if (IsSubclassOfRawGeneric(contentProperty.Type, typeof(DependencyObjectCollection<>)))
            {
                if (!_dependencyValues.Keys.Contains(contentProperty))
                {
                    object doc = Activator.CreateInstance(contentProperty.Type);
                    _dependencyValues.Add(contentProperty, doc);
                }
                ((DependencyObject)_dependencyValues[contentProperty]).AddContent(value);
            }
            else
            {
                if (_dependencyValues.Keys.Contains(contentProperty))
                    throw new Exception(string.Format("The content property value has already been set. {0}.{1}", GetType().Name, contentProperty.Name));

                _dependencyValues.Add(contentProperty, value);
            }
        }

        public void AddAttachedProperty(Type ownerType, string name, object value)
        {
            AttachedPropertyDescription apd = AttachedPropertyDescription.Get(name, ownerType);
            if (apd == null)
            {
                string ownerName = ownerType == null ? "null" : ownerType.Name;
                throw new ArgumentException(string.Format("An unregistered attached property has been passed for the element {0}. {1}.{2}", GetType(), ownerName, name));
            }

            if (apd.Type.IsGenericType && apd.Type.GetGenericTypeDefinition() == typeof(DependencyObjectCollection<>))
            {
                DependencyObject doc;
                if (_attachedValues.ContainsKey(apd))
                {
                    doc = (DependencyObject)_attachedValues[apd];
                }
                else
                {
                    doc = (DependencyObject)Activator.CreateInstance(apd.Type);
                    _attachedValues.Add(apd, doc);
                }
                doc.AddContent(value);
            }
            else
            {
                if (_attachedValues.ContainsKey(apd))
                    throw new Exception(string.Format("The attached property has already been set on the element {0}. {1}.{2}", GetType(), ownerType.Name, name));

                if (value is string)
                {
                    value = GetConvertedValue((string)value, apd.Type);
                }

                _attachedValues.Add(apd, value);
            }
        }

        public static readonly PropertyDescription NameProperty = PropertyDescription.Register("Name", typeof(string), typeof(DependencyObject));
        public string Name
        {
            get { return GetValue("Name") as string; }
            set { SetValue("Name", value); }
        }
        public static readonly PropertyDescription KeyProperty = PropertyDescription.Register("Key", typeof(string), typeof(DependencyObject));
        public string Key
        {
            get { return GetValue("Key") as string; }
            set { SetValue("Key", value); }
        }

        public DependencyObject Parent { get; set; }

        private IDictionary<PropertyDescription, object> GetProperties()
        {
            IDictionary<PropertyDescription, object> properties = new Dictionary<PropertyDescription, object>();
            foreach (PropertyDescription pd in _dependencyValues.Keys)
            {
                if (!pd.IsContent || _dependencyValues[pd] is string)
                {
                    properties.Add(pd, _dependencyValues[pd]);
                }
            }
            return properties;
        }

        private IJsonConvertible GetContent()
        {
            PropertyDescription dp = PropertyDescription.GetContent(GetType());
            if (dp == null)
                return null;
            if (!_dependencyValues.ContainsKey(dp))
                return null;
            object value = _dependencyValues[dp];
            if (value is IJsonConvertible)
                return (IJsonConvertible)value;
            else
                return null;
        }

        public virtual string ToJson(int tabIndent)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendFormat("Type: {0}", GetTypeName());

            if (!string.IsNullOrWhiteSpace(Name))
            {
                sb.AppendLine(",");
                sb.AppendFormat("Name: \"{0}\"", Name);
            }

            if (!string.IsNullOrWhiteSpace(Key))
            {
                sb.AppendLine(",");
                sb.AppendFormat("Key: \"{0}\"", Key);
            }

            string propJson = propsToJson(GetProperties());
            if (!string.IsNullOrWhiteSpace(propJson))
            {
                sb.AppendLine(",");
                sb.AppendLine("Props: {");
                sb.Append(propJson);
                sb.Append("}");
            }

            string attachedJson = attachedPropsToJson(_attachedValues);
            if (!string.IsNullOrWhiteSpace(attachedJson))
            {
                sb.AppendLine(",");
                sb.Append("AttachedProps: [");
                sb.AppendLine(attachedJson);
                sb.Append("]");
            }

            IJsonConvertible content = GetContent();
            if (content != null)
            {
                sb.AppendLine(",");
                if (IsSubclassOfRawGeneric(content.GetType(), typeof(DependencyObjectCollection<>)))
                    sb.Append("Children: ");
                else
                    sb.Append("Content: ");
                sb.Append(content.ToJson(0));
            }
            sb.AppendLine();
            sb.Append("}");
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

        private string attachedPropsToJson(IDictionary<AttachedPropertyDescription, object> properties)
        {
            var sb = new StringBuilder();
            var needsComma = false;
            foreach (AttachedPropertyDescription apd in properties.Keys)
            {
                if (needsComma)
                    sb.AppendLine(",");
                sb.AppendLine("{");
                sb.AppendFormat("Owner: {0}", apd.OwnerType.Name);
                sb.AppendLine(",");
                sb.AppendFormat("Prop: \"{0}\"", apd.Name);
                sb.AppendLine(",");
                sb.Append("Value: ");
                object value = properties[apd];
                if (value is IJsonConvertible)
                {
                    sb.AppendLine(((IJsonConvertible)value).ToJson(0));
                }
                else if (typeof(IList).IsAssignableFrom(value.GetType()))
                {
                    string json = listpropToJson((IList)value);
                    if (json.Length > 0)
                    {
                        sb.AppendLine("[");
                        sb.AppendLine(json);
                        sb.Append("]");
                    }
                }
                else
                {
                    if (value is string)
                        sb.Append("\"");
                    sb.Append(CleanseText(value.ToString()));
                    if (value is string)
                        sb.Append("\"");
                }
                sb.AppendLine();
                sb.Append("}");
                needsComma = true;
            }
            return sb.ToString();
        }

        private string propsToJson(IDictionary<PropertyDescription, object> properties)
        {
            var sb = new StringBuilder();
            var needsComma = false;
            foreach (PropertyDescription pd in properties.Keys)
            {
                if (pd == DependencyObject.NameProperty || pd == DependencyObject.KeyProperty)
                    continue;
                object value = properties[pd];
                if (value == null) continue;

                if (needsComma)
                    sb.AppendLine(",");
                if (this is Setter && pd.Name.Equals("Property"))
                {
                    sb.Append(pd.Name);
                    sb.Append(": ");
                    sb.Append(SerializeSetterProperty(this as Setter, Parent.GetValue("TargetType") as JsType));
                    needsComma = true;
                }
                else if (value is IJsonConvertible)
                {
                    sb.Append(pd.Name);
                    sb.Append(": ");
                    sb.Append(((IJsonConvertible)value).ToJson(0));
                    needsComma = true;
                }
                else if (typeof(IList).IsAssignableFrom(value.GetType()))
                {
                    string json = listpropToJson((IList)value);
                    if (json.Length > 0)
                    {
                        sb.Append(pd.Name);
                        sb.AppendLine(": [");
                        sb.AppendLine(json);
                        sb.Append("]");
                        needsComma = true;
                    }
                }
                else if (value is bool)
                {
                    sb.Append(pd.Name);
                    sb.Append(": ");
                    sb.Append(value.ToString().ToLower());
                    needsComma = true;
                    continue;
                }
                else if (value is Enum)
                {
                    sb.Append(pd.Name);
                    sb.Append(": ");
                    sb.Append(string.Format("{0}.{1}", value.GetType().Name, value.ToString()));
                    needsComma = true;
                    continue;
                }
                else
                {
                    sb.Append(pd.Name);
                    sb.Append(": ");
                    if (value is string)
                        sb.Append("\"");
                    sb.Append(CleanseText(value.ToString()));
                    if (value is string)
                        sb.Append("\"");
                    needsComma = true;
                }
            }
            sb.AppendLine();
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
            var sb = new StringBuilder();
            var needsComma = false;
            foreach (DependencyObject d in values)
            {
                if (needsComma)
                    sb.AppendLine(",");
                sb.Append(d.ToJson(0));
                needsComma = true;
            }
            return sb.ToString();
        }

        private string SerializeSetterProperty(Setter setter, JsType parentType)
        {
            var typeName = parentType.ToJson(0);
            var prop = setter.Property;
            if (prop.Contains("."))
            {
                var tokens = prop.Split('.');
                if (tokens.Length != 2)
                    throw new XamlParseException("A property can only contain a '.' if it is an attached property with the following signature: '<Owner Type>.<Property Name>'.");
                typeName = tokens[0];
                prop = tokens[1];
            }
            return string.Format("DependencyProperty.GetDependencyProperty({0}, \"{1}\")", typeName, prop);
        }

        private static bool IsSubclassOfRawGeneric(Type check, Type generic)
        {
            while (check != typeof(object))
            {
                if (check == null)
                    break;
                var cur = check.IsGenericType ? check.GetGenericTypeDefinition() : check;
                if (generic == cur)
                    return true;
                check = check.BaseType;
            }
            return false;
        }
    }
}