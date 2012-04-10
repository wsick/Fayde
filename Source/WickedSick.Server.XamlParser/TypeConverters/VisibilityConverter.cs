using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public enum VisibilityEnum
    {
        Collapsed = 1,
        Visible = 0
    }

    public class Visibility: IJsonSerializable
    {
        private VisibilityEnum Venum { get; set; }

        public Visibility(VisibilityEnum venum)
        {
            Venum = venum;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("{0}.{1}", this.GetType().Name, Venum.ToString());
        }
    }

    public class VisibilityConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Visibility); }
        }

        public object Convert(string from)
        {
            return new Visibility((VisibilityEnum)Enum.Parse(typeof(VisibilityEnum), from));
        }
    }
}
