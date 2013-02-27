using System;
using System.IO;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class UserControl : Control
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(UserControl), true);

        public static readonly PropertyDescription JsTypeProperty = PropertyDescription.Register("JsType", typeof(string), typeof(UserControl));
        public string JsType
        {
            get { return GetValue("JsType") as string; }
            set { SetValue("JsType", value); }
        }

        private string _DynamicType;
        public void InjectJavascriptType(string js)
        {
            _DynamicType = js;
        }

        public override string GetTypeName(IJsonOutputModifiers outputMods)
        {
            var jsType = JsType;
            if (!string.IsNullOrWhiteSpace(jsType))
                return jsType;

            if (!string.IsNullOrWhiteSpace(_DynamicType))
                return _DynamicType;

            return base.GetTypeName(outputMods);
        }


        private string _XamlFile;
        private string _JsFile;
        protected void SetResources(string xamlFile, string jsFile)
        {
            _XamlFile = xamlFile;
            _JsFile = jsFile;
        }
        public Stream GetXamlResource()
        {
            if (string.IsNullOrWhiteSpace(_XamlFile))
                throw new Exception(string.Format("Could not find XAML for UserControl '{0}'.", GetType().Name));
            return GetType().Assembly.GetManifestResourceStream(_XamlFile);
        }
        public Stream GetJsResource()
        {
            if (string.IsNullOrWhiteSpace(_JsFile))
                throw new Exception(string.Format("Could not find Javascript for UserControl '{0}'.", GetType().Name));
            return GetType().Assembly.GetManifestResourceStream(_JsFile);
        }
    }
}