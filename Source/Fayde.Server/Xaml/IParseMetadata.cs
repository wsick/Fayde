using System;
using System.Collections.Generic;

namespace Fayde.Xaml
{
    public interface IParseMetadata
    {
        void AddParseDependency(string xmlNamespace, string localName);
        IEnumerable<Tuple<string, string>> GetDependencies();
    }
}