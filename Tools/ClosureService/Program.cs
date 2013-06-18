using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ClosureService
{
    class Program
    {
        static void Main(string[] args)
        {
            // args:
            //  in:<filepath>
            //  out:<filepath>
            var cmdLine = ParseCommandLine(args).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            var broker = new ClosureBroker
            {
                InFile = cmdLine.Value("in"),
                OutFile = cmdLine.Value("out"),
                CompilationLevel = ClosureBroker.COMPILATION_LEVEL_2,
            };
            if (!File.Exists(broker.InFile))
            {
                Console.WriteLine("Could not locate input file.");
                return;
            }
            if (string.IsNullOrWhiteSpace(broker.OutFile))
            {
                Console.WriteLine("Output file is required.");
                return;
            }

            try
            {
                broker.Compile();
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred trying to contact closure compiler.");
                Console.WriteLine(ex);
                return;
            }
        }

        static IEnumerable<KeyValuePair<string, string>> ParseCommandLine(string[] args)
        {
            foreach (var arg in args)
            {
                var key = arg.RemoveAfterToken(":").TrimStart('-');
                var value = arg.RemoveBeforeToken(":");
                yield return new KeyValuePair<string, string>(key, value);
            }
        }
    }

    public static class DictionaryEx
    {
        public static TValue Value<TKey, TValue>(this Dictionary<TKey, TValue> dict, TKey key)
        {
            if (dict.ContainsKey(key))
                return dict[key];
            return default(TValue);
        }
    }

    public static class StringEx
    {
        public static string RemoveAfterToken(this string s, string token)
        {
            var index = s.IndexOf(token);
            if (index == -1)
                return s;
            if (index < s.Length)
                return s.Substring(0, index);
            return s;
        }

        public static string RemoveBeforeToken(this string s, string token)
        {
            var index = s.IndexOf(token);
            if (index == -1)
                return s;
            if ((index + 1) < s.Length)
                return s.Substring(index + 1);
            return string.Empty;
        }

        public static bool EqualsIgnoreCase(this string s, string match)
        {
            return string.Equals(s, match, StringComparison.CurrentCultureIgnoreCase);
        }
    }
}