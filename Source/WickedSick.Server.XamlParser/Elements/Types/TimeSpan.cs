using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class TimeSpan : IJsonSerializable
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

        public string toJson(int tabIndents)
        {
            if (_ticks > 0)
                return string.Format("new TimeSpan({0})", _ticks);
            else
                return string.Format("new TimeSpan({0}, {1}, {2}, {3}, {4})", _days, _hours, _minutes, _seconds, _milliseconds);
        }
    }
}
