using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Fayde.Xaml
{
    public class TypeResolver
    {
        public TypeResolver()
        {
        }
        public TypeResolver(Assembly fapAssembly)
        {
            _FapAssembly = fapAssembly;
        }
        private Assembly _FapAssembly;

        private static Dictionary<Assembly, AssemblyTypes> _CachedValidTypes = new Dictionary<Assembly, AssemblyTypes>();
        private static Dictionary<Uri, Tuple<XmlnsDefinitionAttribute, Assembly>> _CachedUriAssemblies = new Dictionary<Uri, Tuple<XmlnsDefinitionAttribute, Assembly>>();

        private static readonly Regex _ClrNamespaceRegex = new Regex("(?<full>assembly=(?<assembly>[^;]*);clr-namespace:(?<clrNamespace>[^;]*);?)|(?<reverse>clr-namespace:(?<clrNamespace>[^;]*);assembly=(?<assembly>[^;]*);?)|(?<short>clr-namespace:(?<clrNamespace>[^;]*);?)");
        public Type GetElementType(string xmlNamespace, string name)
        {
            var match = _ClrNamespaceRegex.Match(xmlNamespace);
            if (!match.Success)
            {
                Uri nsUri;
                if (Uri.TryCreate(xmlNamespace, UriKind.Absolute, out nsUri))
                    return FindType(nsUri, name);
            }
            return FindType(match.Groups["clrNamespace"].Value, match.Groups["assembly"].Value, name);
        }
        internal static readonly string DEFAULT_NS = "http://schemas.wsick.com/fayde";
        public static Type GetElementTypeInDefaultNamespace(string name)
        {
            return new TypeResolver().GetElementType(DEFAULT_NS, name);
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
        private Type FindType(string clrNamespace, string assemblyString, string name)
        {
            Assembly asm;
            if (string.IsNullOrWhiteSpace(assemblyString))
            {
                if (_FapAssembly == null)
                    throw new Exception("Assembly must be specified in anonymous parsing mode.");
                asm = _FapAssembly;
            }
            else
                asm = Assembly.Load(assemblyString);
            AssemblyTypes types = null;
            if (_CachedValidTypes.ContainsKey(asm))
                types = _CachedValidTypes[asm];
            else
                _CachedValidTypes[asm] = types = new AssemblyTypes(asm);
            
            return types.Find(clrNamespace, name);
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

            var binDir = new System.IO.DirectoryInfo(Assembly.GetExecutingAssembly().Location);
            var fi = FindAssemblyWithXmlnsUri(binDir, uriString);
            if (fi != null)
            {
                var asm = Assembly.LoadFile(fi.FullName);
                XmlnsDefinitionAttribute attr;
                TryGetXmlnDefinitionAttribute(asm, uriString, out attr);
                var tuple = Tuple.Create(attr, asm);
                _CachedUriAssemblies[uri] = tuple;
                return tuple;
            }
            return null;
        }
        private static System.IO.FileInfo FindAssemblyWithXmlnsUri(System.IO.DirectoryInfo baseDir, string uriString)
        {
            var appDomain = AppDomain.CreateDomain("TemporaryResolution");
            try
            {
                foreach (var dllFi in baseDir.GetFiles("*.dll", System.IO.SearchOption.AllDirectories))
                {
                    var asm = appDomain.Load(AssemblyName.GetAssemblyName(dllFi.FullName));
                    XmlnsDefinitionAttribute attr;
                    if (TryGetXmlnDefinitionAttribute(asm, uriString, out attr))
                        return dllFi;
                }
                return null;
            }
            finally
            {
                AppDomain.Unload(appDomain);
            }
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