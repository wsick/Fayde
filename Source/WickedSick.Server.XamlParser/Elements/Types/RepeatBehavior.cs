
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public enum RepeatBehaviorType
    {
        IterationCount,
        RepeatDuration,
        Forever
    }

    public class RepeatBehavior: IJsonConvertible
    {
        public RepeatBehaviorType Type { get; set; }
        public double Count { get; set; }
        public TimeSpan TimeSpan { get; set; }

        public string ToJson(int tabIndents)
        {
            if (Type == RepeatBehaviorType.RepeatDuration)
                return string.Format("RepeatBehavior.FromRepeatDuration({0})", TimeSpan.ToJson(0));
            else if (Type == RepeatBehaviorType.IterationCount)
                return string.Format("RepeatBehavior.FromIterationCount({0})", Count);
            return "RepeatBehavior.FromForever()";
        }
    }
}