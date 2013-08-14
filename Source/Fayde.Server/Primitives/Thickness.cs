using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Primitives
{
    [Element("")]
    public class Thickness : IJsonConvertible
    {
        public double Left { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}({1}, {2}, {3}, {4})", ElementAttribute.GetFullNullstoneType(GetType(), outputMods), Left, Top, Right, Bottom);
        }
    }
}