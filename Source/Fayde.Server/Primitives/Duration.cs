using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Primitives
{
    [Element("")]
    public enum DurationType
    {
        Automatic,
        TimeSpan,
        Forever
    }

    [Element("")]
    public class Duration : IJsonConvertible
    {
        private Duration(DurationType durationType)
        {
            DurationType = durationType;
        }

        public Duration(TimeSpan timeSpan)
        {
            DurationType = DurationType.TimeSpan;
            TimeSpan = timeSpan;
        }

        public static Duration Automatic { get { return new Duration(DurationType.Automatic); } }
        public static Duration Forever { get { return new Duration(DurationType.Forever); } }

        public DurationType DurationType { get; private set; }
        public TimeSpan TimeSpan { get; private set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var typeName = ElementAttribute.GetFullNullstoneType(GetType(), outputMods);
            switch (DurationType)
            {
                case DurationType.Automatic:
                default:
                    return string.Format("{0}.Automatic", typeName);
                case DurationType.Forever:
                    return string.Format("{0}.Forever", typeName);
                case DurationType.TimeSpan:
                    return string.Format("new {0}({1})", typeName, TimeSpan.ToJson(tabIndents, outputMods));
            }
        }
    }
}