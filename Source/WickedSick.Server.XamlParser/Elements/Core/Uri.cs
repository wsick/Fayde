
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Uri : DependencyObject
    {
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(string), typeof(String), true);

        public override string ToJson(int tabIndent)
        {
            return string.Format("new Uri(\"{0}\")", GetValue("Value"));
        }
    }
}