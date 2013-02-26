using System;
using System.Collections.Generic;

namespace WickedSick.Server.XamlParser
{
    public interface IParseMetadata
    {
        void AddParseDependency(string xmlNamespace, string localName);
        IEnumerable<Tuple<string, string>> GetDependencies();
    }
}