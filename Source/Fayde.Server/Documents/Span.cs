using Fayde.Xaml.Metadata;

namespace Fayde.Documents
{
    public class Span : Inline
    {
        public static readonly PropertyDescription InlinesProperty = PropertyDescription.Register("Inlines", typeof(InlineCollection), typeof(Span), true);
    }
}