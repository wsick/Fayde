using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum OrientationEnum
    {
        Horizontal,
        Vertical
    }

    public class Orientation : IJsonSerializable
    {
        private OrientationEnum _orientation;

        internal Orientation(OrientationEnum orientation)
        {
            _orientation = orientation;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", this.GetType().Name, _orientation.ToString());
        }
    }

    public class OrientationConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            return new Orientation((OrientationEnum)Enum.Parse(typeof(OrientationEnum), from));
        }

        public Type ConversionType
        {
            get { return typeof(Orientation); }
        }
    }
}
