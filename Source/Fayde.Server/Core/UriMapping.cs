using System;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    public class UriMapping : DependencyObject
    {
        public static readonly PropertyDescription UriProperty = PropertyDescription.Register("Uri", typeof(Uri), typeof(UriMapping));
        public static readonly PropertyDescription MappedUriProperty = PropertyDescription.Register("MappedUri", typeof(Uri), typeof(UriMapping));

        public bool TryMatch(Uri relativeUri, out string mappedUri)
        {
            mappedUri = null;
            var matchTemplateUri = GetValue("Uri") as Uri;
            var matchTemplate = matchTemplateUri.ToString();
            var outputTemplateUri = GetValue("MappedUri") as Uri;
            var outputTemplate = outputTemplateUri.ToString();
            var actual = relativeUri.ToString();
            return UriMatcher.TryMatch(matchTemplate, outputTemplate, actual, out mappedUri);
        }
    }
}