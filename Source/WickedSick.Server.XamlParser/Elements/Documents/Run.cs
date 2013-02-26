
namespace WickedSick.Server.XamlParser.Elements.Documents
{
    [Element("Fayde.Documents")]
    public class Run : Inline
    {
        public static readonly PropertyDescription TextProperty = PropertyDescription.Register("Text", typeof(string), typeof(Run), true);
    }
}