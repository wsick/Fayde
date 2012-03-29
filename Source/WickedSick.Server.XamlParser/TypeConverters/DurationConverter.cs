using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    /*
    <object property="[days.]hours:minutes:seconds[.fractionalSeconds]"/>
    -or-
    <object property="Automatic" .../>
    -or-
    <object property="Forever" .../>
     */

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

    public enum DurationType
    {
        Automatic,
        TimeSpan,
        Forever
    }

    public class Duration : IJsonSerializable
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

        public string toJson(int tabIndents)
        {
            if (DurationType == DurationType.Automatic || DurationType == DurationType.Forever)
                return string.Format("new Duration({0})", DurationType.ToString());
            else
                return string.Format("new Duration({0})", TimeSpan.toJson(tabIndents));
        }
    }

    public class DurationConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            if (from.Equals("Automatic"))
                return Duration.Automatic;
            if (from.Equals("Forever"))
                return Duration.Forever;

            long ticks;
            if (long.TryParse(from, out ticks))
                return new Duration(new TimeSpan(ticks));

            int days = 0;
            int hours;
            int minutes;
            int seconds;
            int milliseconds = 0;
            
            string[] parts = from.Split(':');
            if (parts.Count() != 3)
                throw new ArgumentException("An invalid value for Duration has been provided.");
            
            int periodIndex = parts[0].IndexOf(".");
            if (periodIndex > 0)
            {
                days = int.Parse(parts[0].Substring(0, periodIndex - 1));
                hours = int.Parse(parts[0].Substring(periodIndex + 1, parts[0].Length - (periodIndex + 1)));
            }
            else
                hours = int.Parse(parts[0]);

            minutes = int.Parse(parts[1]);

            periodIndex = parts[2].IndexOf(".");
            if (periodIndex > 0)
            {
                seconds = int.Parse(parts[2].Substring(0, periodIndex - 1));
                milliseconds = int.Parse(parts[2].Substring(periodIndex + 1, parts[2].Length - (periodIndex + 1)));
            }
            else
                seconds = int.Parse(parts[2]);

            return new Duration(new TimeSpan(hours, minutes, seconds, days, milliseconds));
        }

        public Type ConversionType
        {
            get { return typeof(Duration); }
        }
    }
}
