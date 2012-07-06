using System;
using System.Linq;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class TextDecorationCollectionConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(TextDecorationCollection); }
        }

        public object Convert(string from)
        {
            return new TextDecorationCollection(
                from.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(s => s.Trim()));
        }
    }
}