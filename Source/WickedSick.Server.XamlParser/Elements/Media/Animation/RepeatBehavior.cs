using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public enum RepeatBehaviorType
    {
        IterationCount,
        RepeatDuration,
        Forever
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class RepeatBehavior : IJsonConvertible
    {
        public RepeatBehaviorType Type { get; set; }
        public double Count { get; set; }
        public TimeSpan TimeSpan { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var typeName = ElementAttribute.GetFullNullstoneType(GetType(), outputMods);
            if (Type == RepeatBehaviorType.RepeatDuration)
                return string.Format("{0}.FromRepeatDuration({1})", typeName, TimeSpan.ToJson(0, outputMods));
            else if (Type == RepeatBehaviorType.IterationCount)
                return string.Format("{0}.FromIterationCount({1})", typeName, Count);
            return string.Format("{0}.FromForever()", typeName);
        }
    }
}