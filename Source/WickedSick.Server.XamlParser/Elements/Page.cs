using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.XamlParser.Elements
{
    public class Page : UserControl
    {
        public static readonly PropertyDescription TitleProperty = PropertyDescription.Register("Title", typeof(string), typeof(Page));
        public string Title
        {
            get { return GetValue("Title") as string; }
            set { SetValue("Title", value); }
        }

        private string _DynamicType;
        public void InjectJavascriptType(string js)
        {
            _DynamicType = js;
        }

        protected override string GetTypeName()
        {
            if (string.IsNullOrWhiteSpace(_DynamicType))
                return base.GetTypeName();
            return _DynamicType;
        }
    }
}