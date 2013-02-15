
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class GridLength : IJsonConvertible
    {
        public double Value { get; set; }
        public GridUnitType UnitType { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}({1}, {2}.{3})", ElementAttribute.GetFullNullstoneType(GetType(), outputMods), Value, 
                ElementAttribute.GetFullNullstoneType(UnitType.GetType(), outputMods), UnitType.ToString());
        }
    }
}