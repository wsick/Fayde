
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

        public string ToJson(int tabIndents)
        {
            if (Type == KeyTimeType.Uniform)
                return "KeyTime.CreateUniform()";
            else
                return string.Format("KeyTime.CreateTimeSpan({0})", TimeSpan.ToJson(tabIndents));
        }
    }

}