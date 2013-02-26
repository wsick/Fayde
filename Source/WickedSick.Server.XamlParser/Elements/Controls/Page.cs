using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde.Controls")]
    public class Page : UserControl
    {
        public static readonly PropertyDescription TitleProperty = PropertyDescription.Register("Title", typeof(string), typeof(Page));
        public string Title
        {
            get { return GetValue("Title") as string; }
            set { SetValue("Title", value); }
        }

        public static readonly PropertyDescription JsTypeProperty = PropertyDescription.Register("JsType", typeof(string), typeof(Page));
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
    }
}