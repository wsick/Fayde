
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Uri : DependencyObject
    {
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(string), typeof(String), true);

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}(\"{1}\")", GetTypeName(outputMods), GetValue("Value"));
        }
    }
}