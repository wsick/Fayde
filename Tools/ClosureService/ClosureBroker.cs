using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace ClosureService
{
    public class ClosureBroker
    {
        /// <summary>
        /// https://developers.google.com/closure/compiler/docs/api-ref
        /// </summary>

        private static string CLOSURE_URL = @"http://closure-compiler.appspot.com/compile";

        public static readonly string COMPILATION_LEVEL_1 = "WHITESPACE_ONLY";
        public static readonly string COMPILATION_LEVEL_2 = "SIMPLE_OPTIMIZATIONS";
        public static readonly string COMPILATION_LEVEL_3 = "ADVANCED_OPTIMIZATIONS";
        
        public string InFile { get; set; }
        public string OutFile { get; set; }
        public string CompilationLevel { get; set; }

        public void Compile()
        {
            Console.WriteLine("Reading input file...");
            var data = GetParameterData();
            
            Console.WriteLine("Preparing request...");
            var request = CreateRequest(data);

            Console.WriteLine("Calling compiler service...");
            Stream rs = null;
            try
            {
                var response = request.GetResponse();
                rs = response.GetResponseStream();

            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred calling compiler service.");
                Console.WriteLine(ex);
                return;
            }

            try
            {
                var outfi = new FileInfo(OutFile);
                Console.WriteLine("Writing output to `" + outfi.FullName + "`...");
                WriteStreamToFile(rs, outfi);
                Console.WriteLine("Finished writing output.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred writing output.");
                Console.WriteLine(ex);
            }
        }

        protected HttpWebRequest CreateRequest(Dictionary<string, string> pars)
        {
            var request = (HttpWebRequest)HttpWebRequest.Create(CLOSURE_URL);
            request.ContentType = "application/x-www-form-urlencoded";
            request.Method = "POST";

            var indata = string.Join("&", pars.Select(kvp => string.Format("{0}={1}", kvp.Key, kvp.Value)));
            using (var sw = new StreamWriter(request.GetRequestStream()))
            {
                sw.Write(indata);
            }

            return request;
        }

        protected Dictionary<string, string> GetParameterData()
        {
            var infi = new FileInfo(InFile);
            var code = File.ReadAllText(infi.FullName);
            code = HttpUtility.UrlEncode(code);

            var pars = new Dictionary<string, string>
            {
                { "js_code", code },
                { "compilation_level", CompilationLevel },
                { "output_format", "text" },
                { "output_info", "compiled_code" },
            };
            return pars;
        }

        protected static void WriteStreamToFile(Stream compiledstream, FileInfo outfi)
        {
            using (var w = outfi.OpenWrite())
            {
                int read;
                byte[] buffer = new byte[4096];
                while ((read = compiledstream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    w.Write(buffer, 0, read);
                }
            }
        }
    }
}