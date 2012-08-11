
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Double : DependencyObject
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(string), typeof(Double), true);

        public override string ToJson(int tabIndent)
        {
            return GetValue("Content") as string;
        }
    }
}