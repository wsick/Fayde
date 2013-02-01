using System;
using WickedSick.Server.XamlParser.Elements.Media.Animation;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class RepeatBehaviorConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(RepeatBehavior); }
        }

        public object Convert(string from)
        {
            if (from.ToLower().Equals("forever"))
                return new RepeatBehavior() { Type = RepeatBehaviorType.Forever };

            if (from.EndsWith("x"))
            {
                double d = double.Parse(from.Substring(0, from.Length - 1));
                return new RepeatBehavior()
                {
                    Type = RepeatBehaviorType.IterationCount,
                    Count = d
                };
            }

            TimeSpanConverter tsc = new TimeSpanConverter();
            return new RepeatBehavior()
            {
                Type = RepeatBehaviorType.RepeatDuration,
                TimeSpan = (Elements.Types.TimeSpan)tsc.Convert(from)
            };
        }
    }
}
