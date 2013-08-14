using Fayde.Core;

namespace Fayde.Xaml
{
    public class ParseResult : IParseResult
    {
        public DependencyObject RootObject { get; set; }
        public IParseMetadata Metadata { get; set; }
    }
}