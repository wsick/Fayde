using System;
using System.Reflection;
using System.Linq;

namespace WickedSick.Server.XamlParser
{
    public class TypeResolver
    {
        public static Type GetElementType(string @namespace, string name)
        {
            string[] nsParts = @namespace.Split(';');

            var types = from t in Assembly.Load(nsParts[0]).GetTypes()
                        where !t.IsAbstract && t.Namespace != null && t.Namespace.StartsWith(nsParts[1])
                        select t;
            foreach (Type t in types)
            {
                if (t.Name.Equals(name)) return t;
            }
            return null;
        }
    }
}