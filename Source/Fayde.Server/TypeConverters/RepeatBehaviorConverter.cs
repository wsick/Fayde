using System;
using Fayde.Media.Animation;

namespace Fayde.TypeConverters
{
    public class RepeatBehaviorConverter : ITypeConverter
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
                return new RepeatBehavior
                {
                    Type = RepeatBehaviorType.IterationCount,
                    Count = d
                };
            }

            var tsc = new TimeSpanConverter();
            return new RepeatBehavior
            {
                Type = RepeatBehaviorType.RepeatDuration,
                TimeSpan = (Primitives.TimeSpan)tsc.Convert(from)
            };
        }
    }
}