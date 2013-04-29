using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Types;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public abstract class DependencyObject : IJsonConvertible
    {
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

            new Elements.Media.VSM.VisualStateManager();
            new Elements.Controls.ToolTipService();
            new Elements.Controls.Canvas();
        }

        private IDictionary<AttachedPropertyDescription, object> _attachedValues = new Dictionary<AttachedPropertyDescription, object>();
        private IDictionary<PropertyDescription, object> _dependencyValues = new Dictionary<PropertyDescription, object>();
        private Dictionary<EventDescription, string> _EventSubscriptions = new Dictionary<EventDescription, string>();

        public void SetValue(string name, object value)
        {
            //first check to see if the property is defined
            var desc = AttributeDescriptionHelper.Get(name, GetType());
            if (desc == null)
                throw new ArgumentException(string.Format("An unregistered attribute has been passed. {0}.{1}", GetType().Name, name));

            if (desc is PropertyDescription)
                SetValue(desc as PropertyDescription, value);
            else if (desc is EventDescription)
                SetValue(desc as EventDescription, value as string);
        }
        protected void SetValue(PropertyDescription pd, object value)
        {
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
                    throw new Exception(string.Format("The property has already been set. {0}.{1}", GetType().Name, pd.Name));

                if (value is string)
                {
                    value = GetConvertedValue((string)value, pd.Type);
                }

                _dependencyValues.Add(pd, value);
            }
        }
        protected void SetValue(EventDescription ed, string value)
        {
            _EventSubscriptions[ed] = value;
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
            PropertyDescription pd = AttributeDescriptionHelper.Get(name, GetType()) as PropertyDescription;
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
                throw new ArgumentException(string.Format("An unregistered attached property has been passed for the element {0}: {1}.{2}", GetType(), ownerName, name));
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
                    throw new Exception(string.Format("The attached property has already been set on the element {0}: {1}.{2}", GetType(), ownerType.Name, name));

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

        public virtual string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendFormat("ParseType:{0}", GetTypeName(outputMods));

            if (!string.IsNullOrWhiteSpace(Name))
            {
                sb.AppendLine(",");
                sb.AppendFormat("Name:\"{0}\"", Name);
            }

            /*
            if (!string.IsNullOrWhiteSpace(Key))
            {
                sb.AppendLine(",");
                sb.AppendFormat("Key: \"{0}\"", Key);
            }
            */

            string propJson = propsToJson(GetProperties(), outputMods);
            if (!string.IsNullOrWhiteSpace(propJson))
            {
                sb.AppendLine(",");
                sb.AppendLine("Props:{");
                sb.Append(propJson);
                sb.Append("}");
            }

            string attachedJson = attachedPropsToJson(_attachedValues, outputMods);
            if (!string.IsNullOrWhiteSpace(attachedJson))
            {
                sb.AppendLine(",");
                sb.Append("AttachedProps:[");
                sb.AppendLine(attachedJson);
                sb.Append("]");
            }

            WriteEventsToJson(sb);

            IJsonConvertible content = GetContent();
            if (content != null)
            {
                sb.AppendLine(",");
                if (IsSubclassOfRawGeneric(content.GetType(), typeof(DependencyObjectCollection<>)))
                    sb.Append("Children:");
                else
                    sb.Append("Content:");
                sb.Append(content.ToJson(0, outputMods));
            }
            sb.AppendLine();
            sb.Append("}");
            return sb.ToString();
        }

        public virtual string GetTypeName(IJsonOutputModifiers outputMods)
        {
            return ElementAttribute.GetFullNullstoneType(GetType(), outputMods);
        }

        private string propsToJson(IDictionary<PropertyDescription, object> properties, IJsonOutputModifiers outputMods)
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
                    sb.AppendFormat("{0}:", pd.Name);
                    sb.Append(SerializeSetterProperty(this as Setter, Parent.GetValue("TargetType") as JsType, outputMods));
                    needsComma = true;
                }
                else if (value is IJsonConvertible)
                {
                    sb.AppendFormat("{0}:", pd.Name);
                    sb.Append(((IJsonConvertible)value).ToJson(0, outputMods));
                    needsComma = true;
                }
                else if (typeof(IList).IsAssignableFrom(value.GetType()))
                {
                    string json = listpropToJson((IList)value, outputMods);
                    if (json.Length > 0)
                    {
                        sb.AppendFormat("{0}:", pd.Name);
                        sb.AppendLine("[");
                        sb.AppendLine(json);
                        sb.Append("]");
                        needsComma = true;
                    }
                }
                else if (value is bool)
                {
                    sb.AppendFormat("{0}:", pd.Name);
                    sb.Append(value.ToString().ToLower());
                    needsComma = true;
                    continue;
                }
                else if (value is Enum)
                {
                    sb.AppendFormat("{0}:", pd.Name);
                    sb.Append(string.Format("{0}.{1}", ElementAttribute.GetFullNullstoneType(value.GetType(), outputMods), value.ToString()));
                    needsComma = true;
                    continue;
                }
                else
                {
                    sb.AppendFormat("{0}:", pd.Name);
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
        private string attachedPropsToJson(IDictionary<AttachedPropertyDescription, object> properties, IJsonOutputModifiers outputMods)
        {
            var sb = new StringBuilder();
            var needsComma = false;
            foreach (AttachedPropertyDescription apd in properties.Keys)
            {
                if (needsComma)
                    sb.AppendLine(",");
                sb.AppendLine("{");
                sb.AppendFormat("Owner: {0}", ElementAttribute.GetFullNullstoneType(apd.OwnerType, outputMods));
                sb.AppendLine(",");
                sb.AppendFormat("Prop: \"{0}\"", apd.Name);
                sb.AppendLine(",");
                sb.Append("Value: ");
                object value = properties[apd];
                if (value is IJsonConvertible)
                {
                    sb.AppendLine(((IJsonConvertible)value).ToJson(0, outputMods));
                }
                else if (typeof(IList).IsAssignableFrom(value.GetType()))
                {
                    string json = listpropToJson((IList)value, outputMods);
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
        private void WriteEventsToJson(StringBuilder sb)
        {
            if (!_EventSubscriptions.Any())
                return;
            sb.AppendLine(",");
            sb.Append("Events: {");
            var needsComma = false;
            foreach (var evt in _EventSubscriptions)
            {
                if (needsComma)
                    sb.AppendLine(",");
                sb.AppendFormat(string.Format("{0}: \"{1}\"", evt.Key.Name, evt.Value));
                needsComma = true;
            }
            sb.Append("}");
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

        private string listpropToJson(IList values, IJsonOutputModifiers outputMods)
        {
            var sb = new StringBuilder();
            var needsComma = false;
            foreach (DependencyObject d in values)
            {
                if (needsComma)
                    sb.AppendLine(",");
                sb.Append(d.ToJson(0, outputMods));
                needsComma = true;
            }
            return sb.ToString();
        }

        private string SerializeSetterProperty(Setter setter, JsType parentType, IJsonOutputModifiers outputMods)
        {
            var typeName = parentType.ToJson(0, outputMods);
            var prop = setter.Property;
            if (prop.Contains("."))
            {
                var tokens = prop.Split('.');
                if (tokens.Length != 2)
                    throw new XamlParseException("A property can only contain a '.' if it is an attached property with the following signature: '<Owner Type>.<Property Name>'.");
                typeName = tokens[0];
                if (typeName.Contains(":"))
                    throw new NotSupportedException("Namespaces in owner types for setter properties.");
                var type = TypeResolver.GetElementTypeInDefaultNamespace(typeName);
                if (type != null)
                    typeName = ElementAttribute.GetFullNullstoneType(type, outputMods);
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