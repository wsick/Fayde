using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser
{
    public class ParseResult : IParseResult
    {
        public DependencyObject RootObject { get; set; }
        public IParseMetadata Metadata { get; set; }
    }
}