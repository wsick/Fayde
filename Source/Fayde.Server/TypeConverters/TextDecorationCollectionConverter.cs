using System;
using System.Linq;
using Fayde.Core;

namespace Fayde.TypeConverters
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