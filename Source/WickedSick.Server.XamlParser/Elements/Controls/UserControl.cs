using System;
using System.IO;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class UserControl : Control
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(UserControl), true);

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