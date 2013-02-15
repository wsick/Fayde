
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public enum KeyTimeType
    {
        Uniform = 0,
        TimeSpan = 2,
    }

    public class KeyTime : IJsonConvertible
    {
        public static KeyTime Uniform = new KeyTime { Type = KeyTimeType.Uniform };

        public KeyTimeType Type { get; set; }
        public TimeSpan TimeSpan { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var typeName = ElementAttribute.GetFullNullstoneType(GetType(), outputMods);
            if (Type == KeyTimeType.Uniform)
                return string.Format("{0}.CreateUniform()", typeName);
            else
                return string.Format("{0}.CreateTimeSpan({1})", typeName, TimeSpan.ToJson(tabIndents, outputMods));
        }
    }

}