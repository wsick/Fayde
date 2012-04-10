using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum PlacementModeEnum
    {
        Bottom = 2,
        Left = 9,
        Mouse = 7,
        Right = 4,
        Top = 10
    }

    public class PlacementMode: IJsonSerializable
    {
        private PlacementModeEnum Mode { get; set; }

        public PlacementMode(PlacementModeEnum mode)
        {
            Mode = mode;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", GetType(), Mode.ToString());
        }
    }

    public class PlacementModeConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PlacementMode); }
        }

        public object Convert(string from)
        {
            return new PlacementMode((PlacementModeEnum)Enum.Parse(typeof(PlacementModeEnum), from));
        }
    }
}
