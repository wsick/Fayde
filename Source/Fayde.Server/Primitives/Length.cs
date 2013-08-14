using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Primitives
{
    public class Length : IJsonConvertible
    {
        public double? Value { get; set; }

        public Length()
        {
            Value = null;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return Value.ToString();
        }
    }
}
