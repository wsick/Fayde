using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser
{
    public interface IParseResult
    {
        DependencyObject RootObject { get; }
        IParseMetadata Metadata { get; }
    }
}