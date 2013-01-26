
namespace WickedSick.Server.XamlParser.Elements.Data
{
    [Element(NullstoneNamespace = "Fayde.Data", NullstoneName = "_PropertyPath")]
    public class PropertyPath : IJsonConvertible
    {
        public string Path { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new {0}(\"{1}\")", ElementAttribute.GetFullNullstoneType(GetType()), Path);
        }
    }
}