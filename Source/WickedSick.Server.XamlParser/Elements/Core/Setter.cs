
namespace WickedSick.Server.XamlParser.Elements.Core
{
    [Element("Fayde")]
    public class Setter : DependencyObject
    {
        //TODO: Rewire specific SetterValueConverter
        public static readonly PropertyDescription PropertyProperty = PropertyDescription.Register("Property", typeof(string), typeof(Setter));
        public string Property
        {
            get { return GetValue("Property") as string; }
            set { SetValue("Property", value); }
        }

        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(object), typeof(Setter));
        public object Value
        {
            get { return GetValue("Value"); }
            set { SetValue("Value", value); }
        }
    }
}