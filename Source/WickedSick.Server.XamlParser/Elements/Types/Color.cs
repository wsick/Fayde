using System;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class Color : DependencyObject
    {
        protected static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(string), typeof(Color), true);
        protected string Content
        {
            get { return GetValue("Content") as string; }
            set { SetValue("Content", value); }
        }

        public static Color FromHex(string hexString)
        {
            return new Color() { HexString = hexString };
        }

        public static Color FromUInt32(UInt32 uint32)
        {
            return new Color() { HexString = string.Format("#{0:x8}", uint32).ToUpper() };
        }

        private string HexString { get; set; }

        public override string ToJson(int tabIndents)
        {
            if (Content != null)
            {
                var color = new WickedSick.Server.XamlParser.TypeConverters.ColorConverter();
                return (color.Convert(Content) as IJsonConvertible).ToJson(tabIndents);
            }

            return string.Format("Color.FromHex(\"{0}\")", HexString);
        }
    }
}