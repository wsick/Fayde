using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Data
{
    [Element("Fayde.Data")]
    public class PropertyPath : IJsonConvertible
    {
        public string Path { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}(\"{1}\")", ElementAttribute.GetFullNullstoneType(GetType(), outputMods), Path);
        }
    }
}