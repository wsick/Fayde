using System;
using Fayde.Primitives;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Imaging
{
    public class BitmapImage : BitmapSource
    {
        public static readonly PropertyDescription UriSourceProperty = PropertyDescription.Register("UriSource", typeof(JsonUri), typeof(BitmapImage));
        public JsonUri UriSource
        {
            get { return GetValue("UriSource") as JsonUri; }
            set { SetValue(UriSourceProperty, value); }
        }

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var uriSource = UriSource;
            if (uriSource == null)
                return "null";
            return uriSource.ToJson(tabIndents, outputMods);
        }
    }
}