using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Page : UserControl
    {
        public static readonly PropertyDescription TitleProperty = PropertyDescription.Register("Title", typeof(string), typeof(Page));
        public string Title
        {
            get { return GetValue("Title") as string; }
            set { SetValue("Title", value); }
        }
    }
}