//#define TESTING

using System;
using System.Collections.Generic;
using System.Linq;

namespace JsSingularity
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // args:
            //  DeployPath
            //  ScriptsFolder
            //  IncludeSubdirectories
            //  IncludesFile
            //  BaseIncludePath
            //  TsIncludeFormat
            //      ?f||{0} --> Use Full Path
            //      ?s||{0} --> Use Relative Path (Use \ instead of /)
            //      {0}     --> Use Relative Path (Use /)
            var cmdLine = ParseCommandLine(args).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

            var combiner = new Combiner
            {
                DeployPath = cmdLine.Value("DeployPath"),
                ScriptsFolder = cmdLine.Value("ScriptsFolder"),
                ShouldSearchSubDirectories = cmdLine.Value("IncludeSubdirectories").EqualsIgnoreCase("true"),
                IncludesFilePath = cmdLine.Value("IncludesFile"),
                BaseIncludesPath = cmdLine.Value("BaseIncludesPath"),
                IsDebug = cmdLine.Value("Debug").EqualsIgnoreCase("true"),
                IsInTSMode = cmdLine.Value("ts").EqualsIgnoreCase("true"),
                TsIncludeFile = cmdLine.Value("TsIncludeFile"),
                TsIncludeFormat = cmdLine.Value("TsIncludeFormat"),
            };
#if TESTING
            combiner.DeployPath = System.IO.Directory.GetCurrentDirectory();
            combiner.ScriptsFolder = @"D:\Source\Fayde\Source\WickedSick.Fayde.Client.Engine\Javascript\Core";
            combiner.ShouldSearchSubDirectories = true;
            combiner.IncludesFilePath = @"Fayde.Core.order";
            combiner.BaseIncludesPath = @"D:\Source\Fayde\Source\WickedSick.Fayde.Client.Engine\Javascript";
#endif
            combiner.Combine();
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
