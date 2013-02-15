using System;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Imaging
{
    [Element(NullstoneNamespace="Fayde.Media.Imaging")]
    public class BitmapImage : BitmapSource
    {
        public static readonly PropertyDescription UriSource = PropertyDescription.Register("UriSource", typeof(Uri), typeof(BitmapImage));

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var uriType = ElementAttribute.GetFullNullstoneType(typeof(Uri), outputMods);
            var originalString = ((Uri)GetValue("UriSource")).OriginalString;
            return string.Format("new {0}(\"{1}\")", uriType, originalString);
        }
    }
}
