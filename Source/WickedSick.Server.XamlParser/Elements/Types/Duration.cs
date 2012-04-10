using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
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

        public Duration(Elements.Types.TimeSpan timeSpan)
        {
            DurationType = DurationType.TimeSpan;
            TimeSpan = timeSpan;
        }

        public static Duration Automatic { get { return new Duration(DurationType.Automatic); } }
        public static Duration Forever { get { return new Duration(DurationType.Forever); } }

        public DurationType DurationType { get; private set; }
        public Elements.Types.TimeSpan TimeSpan { get; private set; }

        public string toJson(int tabIndents)
        {
            if (DurationType == DurationType.Automatic || DurationType == DurationType.Forever)
                return string.Format("new Duration({0})", DurationType.ToString());
            else
                return string.Format("new Duration({0})", TimeSpan.toJson(tabIndents));
        }
    }
}
