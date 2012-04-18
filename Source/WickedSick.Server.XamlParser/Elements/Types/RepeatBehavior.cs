using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public enum RepeatBehaviorType
    {
        IterationCount,
        RepeatDuration,
        Forever
    }

    public class RepeatBehavior: IJsonSerializable
    {
        public RepeatBehaviorType Type { get; set; }
        public double Count { get; set; }
        public TimeSpan TimeSpan { get; set; }

        public string toJson(int tabIndents)
        {
            string value;
            if (Type == RepeatBehaviorType.RepeatDuration)
                value = TimeSpan.toJson(0);
            else if (Type == RepeatBehaviorType.IterationCount)
                value = Count.ToString();
            else
                value = "Forever";
            return string.Format("new RepeatBehavior({0})", value);
        }
    }
}
