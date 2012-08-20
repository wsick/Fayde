using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Documents
{
    public class Span : Inline
    {
        public static readonly PropertyDescription InlinesProperty = PropertyDescription.Register("Inlines", typeof(InlineCollection), typeof(Span), true);
    }
}