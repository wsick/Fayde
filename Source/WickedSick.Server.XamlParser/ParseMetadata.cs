using System;
using System.Collections.Generic;
using System.Linq;

namespace WickedSick.Server.XamlParser
{
    public class ParseMetadata : IParseMetadata
    {
        private List<Tuple<string, string>> _Dependencies = new List<Tuple<string, string>>();

        public void AddParseDependency(string xmlNamespace, string localName)
        {
            _Dependencies.Add(Tuple.Create(xmlNamespace, localName));
        }

        public IEnumerable<Tuple<string, string>> GetDependencies()
        {
            return _Dependencies
                .Distinct(new DependencyEqualityComparer());
        }

        private class DependencyEqualityComparer : IEqualityComparer<Tuple<string, string>>
        {
            public bool Equals(Tuple<string, string> x, Tuple<string, string> y)
            {
                return x.Item1 == y.Item1 && x.Item2 == y.Item2;
            }

            public int GetHashCode(Tuple<string, string> obj)
            {
                return obj.Item1.GetHashCode() ^ obj.Item2.GetHashCode();
            }
        }
    }
}
