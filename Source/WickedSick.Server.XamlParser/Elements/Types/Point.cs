
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Point : IJsonConvertible
    {
        public double X { get; set; }
        public double Y { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}({1}, {2})", ElementAttribute.GetFullNullstoneType(GetType(), outputMods), X, Y);
        }
    }
}
