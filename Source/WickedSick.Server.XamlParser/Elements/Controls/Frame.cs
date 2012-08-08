
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class Frame : UIElement
    {
        public Frame()
        {
            IsDeepLinked = true;
        }

        public static PropertyDescription IsDeepLinkedProperty = PropertyDescription.Register("IsDeepLinked", typeof(bool), typeof(Frame));
        public bool IsDeepLinked
        {
            get
            {
                var idl = GetValue("IsDeepLinked");
                return idl != null && (bool)idl;
            }
            set { SetValue("IsDeepLinked", value); }
        }
    }
}