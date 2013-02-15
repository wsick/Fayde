using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace WickedSick.Server.XamlParser
{
    public class TypeResolver
    {
        private static Dictionary<Assembly, AssemblyTypes> _CachedValidTypes = new Dictionary<Assembly, AssemblyTypes>();
        private static Dictionary<Uri, Tuple<XmlnsDefinitionAttribute, Assembly>> _CachedUriAssemblies = new Dictionary<Uri, Tuple<XmlnsDefinitionAttribute, Assembly>>();

        public static Type GetElementType(string xmlNamespace, string name)
        {
            Uri nsUri;
            if (Uri.TryCreate(xmlNamespace, UriKind.Absolute, out nsUri))
                return FindType(nsUri, name);
            return FindType(xmlNamespace, name);
        }
        private static Type FindType(Uri uri, string name)
        {
            var tuple = FindAssembly(uri);
            if (tuple == null)
                throw new Exception(string.Format("Could not resolve assembly URI: {0}.", uri));

            var attr = tuple.Item1;
            var asm = tuple.Item2;
            AssemblyTypes types = null;
            if (_CachedValidTypes.ContainsKey(asm))
                types = _CachedValidTypes[asm];
            else
                _CachedValidTypes[asm] = types = new AssemblyTypes(asm);
            
            return types.Find(attr, name);
        }
        private static Type FindType(string xmlNamespace, string name)
        {
            var tokens = xmlNamespace.Split(';');
            var assemblyString = tokens[0];
            var @namespace = tokens[1];

            var asm = Assembly.Load(assemblyString);
            AssemblyTypes types = null;
            if (_CachedValidTypes.ContainsKey(asm))
                types = _CachedValidTypes[asm];
            else
                _CachedValidTypes[asm] = types = new AssemblyTypes(asm);
            
            return types.Find(@namespace, name);
        }
        private static Tuple<XmlnsDefinitionAttribute, Assembly> FindAssembly(Uri uri)
        {
            if (_CachedUriAssemblies.ContainsKey(uri))
                return _CachedUriAssemblies[uri];

            var uriString = uri.ToString();
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            foreach (var asm in assemblies)
            {
                XmlnsDefinitionAttribute attr;
                if (!TryGetXmlnDefinitionAttribute(asm, uriString, out attr))
                    continue;
                var tuple = Tuple.Create(attr, asm);
                _CachedUriAssemblies[uri] = tuple;
                return tuple;
            }

            //TODO: Search bin directory

            return null;
        }
        private static bool TryGetXmlnDefinitionAttribute(Assembly asm, string uriString, out XmlnsDefinitionAttribute attribute)
        {
            attribute = null;
            if (!asm.IsDefined(typeof(XmlnsDefinitionAttribute), false))
                return false;
            foreach (XmlnsDefinitionAttribute attr in asm.GetCustomAttributes(typeof(XmlnsDefinitionAttribute), false))
            {
                if (attr.XmlNamespace == uriString)
                {
                    attribute = attr;
                    return true;
                }
            }
            return false;
        }

        private class AssemblyTypes
        {
            private Dictionary<string, List<Type>> _AllTypes;

            public AssemblyTypes(Assembly asm)
            {
                _AllTypes = asm
                    .GetTypes()
                    .Where(t => !t.IsAbstract && t.Namespace != null)
                    .GroupBy(t => t.Namespace)
                    .ToDictionary(grp => grp.Key, grp => grp.ToList());
            }

            public Type Find(XmlnsDefinitionAttribute attr, string name)
            {
                foreach (var kvp in _AllTypes)
                {
                    if (!kvp.Key.StartsWith(attr.ClrNamespace))
                        continue;
                    var type = kvp.Value.FirstOrDefault(t => t.Name == name);
                    if (type != null)
                        return type;
                }
                return null;
            }

            public Type Find(string @namespace, string name)
            {
                if (!_AllTypes.ContainsKey(@namespace))
                    return null;
                return _AllTypes[@namespace].FirstOrDefault(t => t.Name == name);
            }
        }
    }
}