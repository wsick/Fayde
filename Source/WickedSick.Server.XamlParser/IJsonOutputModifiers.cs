using System;

namespace WickedSick.Server.XamlParser
{
    public interface IJsonOutputModifiers
    {
        bool IsNamespaceIncluded { get; }
        void AddTypeReference(Type type);
    }
}