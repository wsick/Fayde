using System;

namespace WickedSick.Server.XamlParser.Elements
{
    public interface IElementTypeable
    {
        Type ElementType { get; }
    }
}