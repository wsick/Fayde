using System;

namespace Fayde.Xaml
{
    public interface IJsonOutputModifiers
    {
        bool IsNamespaceIncluded { get; }
        void AddTypeReference(Type type);
    }
}