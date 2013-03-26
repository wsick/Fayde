using System;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Core;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public class ResourceDictionary : DependencyObjectCollection<DependencyObject>
    {
        public static readonly PropertyDescription MergedDictionariesProperty = PropertyDescription.Register("MergedDictionaries", typeof(ResourceDictionaryCollection), typeof(ResourceDictionary));

        public static readonly PropertyDescription SourceProperty = PropertyDescription.Register("Source", typeof(string), typeof(ResourceDictionary));
        public string Source
        {
            get { return GetValue("Source") as string; }
            set { SetValue(SourceProperty, value); }
        }

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine(string.Format("Type: {0}, ", GetTypeName(outputMods)));
            sb.Append("Children: ");
            WriteChildren(sb, tabIndents + 1, outputMods);
            sb.Append("}");
            return sb.ToString();
        }

        protected override void WriteChild(object o, StringBuilder sb, int tabIndents, IJsonOutputModifiers outputMods)
        {
            sb.Append("{");
            var dobj = o as DependencyObject;
            if (dobj != null)
            {
                if (!string.IsNullOrWhiteSpace(dobj.Key))
                    sb.AppendFormat("Key:\"{0}\",", dobj.Key);
                else if (!(dobj is Style))
                    throw new Exception("Resource must have either a Key or be a style with a TargetType.");
                sb.Append("Value:");
                sb.AppendLine(dobj.ToJson(tabIndents, outputMods));
            }
            else
            {
                //TODO: We can't handle non-DependencyObjects (we need a key)
            }
            sb.Append("}");
        }

        protected virtual void WriteChild(StringBuilder sb, int tabIndents, IJsonOutputModifiers outputMods)
        {
            sb.AppendLine(base.ToJson(tabIndents, outputMods));
        }
    }
}