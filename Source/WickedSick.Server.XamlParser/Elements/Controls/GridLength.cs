
namespace WickedSick.Server.XamlParser.Elements.Types
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public enum GridUnitType
    {
        Auto,
        Pixel,
        Star
    }

    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class GridLength : IJsonConvertible
    {
        public double Value { get; set; }
        public GridUnitType UnitType { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new {0}({1}, {2}.{3})", ElementAttribute.GetFullNullstoneType(GetType()), Value, 
                ElementAttribute.GetFullNullstoneType(UnitType.GetType()), UnitType.ToString());
        }
    }
}