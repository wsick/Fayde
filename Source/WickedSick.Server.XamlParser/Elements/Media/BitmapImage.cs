using System;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class BitmapImage : BitmapSource
    {
        public static readonly PropertyDescription UriSource = PropertyDescription.Register("UriSource", typeof(Uri), typeof(BitmapImage));

        public override string toJson(int tabIndents)
        {
            return string.Format("new Uri(\"{0}\")", ((Uri)GetValue("UriSource")).OriginalString);
        }
    }
}
