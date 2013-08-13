using System;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("", "App")]
    public class FaydeApplication : DependencyObject
    {
        public static readonly string DEFAULT_THEME = "Metro";

        public Parser Parser { get; internal set; }

        public Type ResolveType(string xmlNamespace, string xmlName)
        {
            var type = Parser.TypeResolver.GetElementType(xmlNamespace, xmlName);
            if (type == null)
                throw new Exception(string.Format("Could not resolve type: '{0}.{1}'", xmlNamespace, xmlName));
            return type;
        }

        //public static readonly PropertyDescription DefaultPageUriProperty = PropertyDescription.Register("DefaultPageUri", typeof(string), typeof(FaydeApplication));
        public static readonly PropertyDescription WidthProperty = PropertyDescription.Register("Width", typeof(PageLength), typeof(FaydeApplication));
        public static readonly PropertyDescription HeightProperty = PropertyDescription.Register("Height", typeof(PageLength), typeof(FaydeApplication));
        
        public static readonly PropertyDescription ResourcesProperty = PropertyDescription.Register("Resources", typeof(ResourceDictionary), typeof(FaydeApplication));
        public ResourceDictionary Resources
        {
            get { return GetValue("Resources") as ResourceDictionary; }
            set { SetValue("Resources", value); }
        }
        
        public static readonly PropertyDescription UriMappingsProperty = PropertyDescription.Register("UriMappings", typeof(UriMappingCollection), typeof(FaydeApplication));
        public UriMappingCollection UriMappings
        {
            get { return GetValue("UriMappings") as UriMappingCollection; }
            set { SetValue("UriMappings", value); }
        }

        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(FaydeApplication), true);
        public UIElement Content
        {
            get { return GetValue("Content") as UIElement; }
            set { SetValue("Content", value); }
        }

        public static readonly PropertyDescription ScriptResolutionProperty = PropertyDescription.Register("ScriptResolution", typeof(string), typeof(FaydeApplication));
        public string ScriptResolution
        {
            get { return GetValue("ScriptResolution") as string; }
            set { SetValue("ScriptResolution", value); }
        }

        public static readonly PropertyDescription JsTypeProperty = PropertyDescription.Register("JsType", typeof(string), typeof(FaydeApplication));
        public string JsType
        {
            get { return GetValue("JsType") as string; }
            set { SetValue("JsType", value); }
        }

        public static readonly PropertyDescription ThemeProperty = PropertyDescription.Register("Theme", typeof(string), typeof(FaydeApplication));
        public string Theme
        {
            get { return GetValue("Theme") as string; }
            set { SetValue("Theme", value); }
        }

        public override string GetTypeName(IJsonOutputModifiers outputMods)
        {
            if (!string.IsNullOrWhiteSpace(JsType))
                return JsType;
            return base.GetTypeName(outputMods);
        }


        public string MapUri(string fragment)
        {
            if (UriMappings == null)
                return null;

            var relativeUri = new Uri(fragment ?? string.Empty, UriKind.Relative);
            string mappedUri;
            foreach (var mapping in UriMappings)
            {
                if (mapping.TryMatch(relativeUri, out mappedUri))
                    return mappedUri;
            }
            return null;
        }
    }
}