using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Imaging
{
    public class BitmapSource : ImageSource
    {
        [Property]
        [DoubleConverter]
        public double PixelWidth { get; set; }

        [Property]
        [DoubleConverter]
        public double PixelHeight { get; set; }
    }
}
