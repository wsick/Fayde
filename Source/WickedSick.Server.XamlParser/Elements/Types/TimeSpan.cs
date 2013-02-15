
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class TimeSpan : IJsonConvertible
    {
        private long _ticks;
        private int _days;
        private int _hours;
        private int _minutes;
        private int _seconds;
        private int _milliseconds;

        public TimeSpan(long ticks)
        {
            _ticks = ticks;
        }

        public TimeSpan(int hours, int minutes, int seconds, int days = 0, int milliseconds = 0)
        {
            _days = days;
            _hours = hours;
            _minutes = minutes;
            _seconds = seconds;
            _milliseconds = milliseconds;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var typeName = ElementAttribute.GetFullNullstoneType(GetType(), outputMods);
            if (_ticks > 0)
                return string.Format("new {0}({1})", typeName, _ticks);
            else
                return string.Format("new {0}({1}, {2}, {3}, {4}, {5})", typeName, _days, _hours, _minutes, _seconds, _milliseconds);
        }
    }
}
