
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class String : DependencyObject
    {
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(string), typeof(String), true);

        public override string ToJson(int tabIndent)
        {
            return string.Format("\"{0}\"", GetValue("Value"));
        }
    }
}