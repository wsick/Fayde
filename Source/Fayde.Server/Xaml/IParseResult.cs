using Fayde.Core;

namespace Fayde.Xaml
{
    public interface IParseResult
    {
        DependencyObject RootObject { get; }
        IParseMetadata Metadata { get; }
    }
}