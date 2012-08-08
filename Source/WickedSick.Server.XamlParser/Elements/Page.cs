
namespace WickedSick.Server.XamlParser.Elements
{
    public class Page : FrameworkElement
    {
        public static readonly PropertyDescription TitleProperty = PropertyDescription.Register("Title", typeof(string), typeof(Page));
        public string Title
        {
            get { return GetValue("Title") as string; }
            set { SetValue("Title", value); }
        }

        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(Page), true);
        public UIElement Content
        {
            get { return GetValue("Content") as UIElement; }
            set { SetValue("Content", value); }
        }
    }
}