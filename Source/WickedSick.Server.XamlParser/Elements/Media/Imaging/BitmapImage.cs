using System;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Imaging
{
    public class BitmapImage : BitmapSource
    {
        [Property]
        [UriConverter]
        public Uri UriSource { get; set; }

        public override string toJson(int tabIndent)
        {
            return string.Format("new Uri(\"{0}\")", UriSource.OriginalString);
        }
    }
}
