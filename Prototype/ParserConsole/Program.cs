using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;

namespace ParserConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            //var source = @"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.fayde";
            //var destination = @"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.html";

            new Program().Run(ParseCommandLine(args).ToDictionary());
        }

        public void Run(Dictionary<string, string> cmdLine)
        {
#if DEBUG
            cmdLine["source"] = @"D:\Source\Fayde\Prototype\Html5RenderEngineTests.Web\styles\HyperlinkButton.xml";
            cmdLine["destination"] = @"D:\Source\Fayde\Prototype\Html5RenderEngineTests.Web\styles\HyperlinkButton.js";
#endif
            if (!Validate(cmdLine))
                return;

            try
            {
                using (var fs = new FileStream(cmdLine["destination"], FileMode.Create))
                using (var sw = new StreamWriter(fs) { AutoFlush = true })
                {
                    sw.Write(Parse(cmdLine["source"]).ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadLine();
            }
        }

        private bool Validate(Dictionary<string, string> cmdLine)
        {
            if (string.IsNullOrWhiteSpace(cmdLine.Value("source")))
            {
                Console.WriteLine("No source file was specified.");
                return false;
            }
            if (string.IsNullOrWhiteSpace(cmdLine.Value("destination")))
            {
                Console.WriteLine("No destination file was specified.");
                return false;
            }
            return true;
        }

        private object Parse(string source)
        {
            var doc = new XmlDocument();
            doc.Load(source);
            //if (!doc.DocumentElement.Name.ToLower().Equals("page"))
                //throw new Exception("We currently only support the Page element as the document root.");

            return Parser.Parser.ParseXmlNode(doc.DocumentElement, null);
        }

        public static IEnumerable<KeyValuePair<string, string>> ParseCommandLine(string[] args)
        {
            foreach (var arg in args)
            {
                var tokens = arg.TrimStart('-').Split(':');
                yield return new KeyValuePair<string, string>(tokens.FirstOrDefault(), tokens.Skip(1).FirstOrDefault());
            }
        }
    }

    public static class IEnumerableEx
    {
        public static Dictionary<TKey, TValue> ToDictionary<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> e)
        {
            return e.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
        }

        public static TValue Value<TKey, TValue>(this Dictionary<TKey, TValue> dict, TKey key)
        {
            if (dict.ContainsKey(key))
                return dict[key];
            return default(TValue);
        }
    }
}
