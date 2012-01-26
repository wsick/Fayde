using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace JsSingularity
{
    public class Combiner
    {
        private static readonly Regex JS_REF_REGEX = new Regex(@"///\s?<reference\spath=""(?<filename>[^\\/:*?""<>|\r\n]+\.js)""\s?/>", RegexOptions.Compiled);
        private static readonly Regex CANCEL_REF_REGEX = new Regex(@"///\s*CODE", RegexOptions.Compiled);

        private static readonly string JS_INCLUDE_FORMAT = "<script src=\"{0}\" type=\"text/javascript\"></script>";
        
        public Combiner()
        {
        }

        public bool ShouldSearchSubDirectories { get; set; }
        public string ScriptsFolder { get; set; }
        public string DeployPath { get; set; }
        public string IncludesFilePath { get; set; }
        public string BaseIncludesPath { get; set; }

        protected DirectoryInfo ScriptsDirectory { get; set; }

        public void Combine()
        {
            ScriptsDirectory = new DirectoryInfo(ScriptsFolder);

            var orderedFiles = CollectOrderedFiles().ToList();
            WriteDebugIncludes(orderedFiles);
            WriteCombinedJavascript(orderedFiles);
        }

        protected IEnumerable<JsFile> CollectOrderedFiles()
        {   
            var db = new DependencyBroker
            {
                AllJsFiles = Peak().ToList(),
            };
            db.ConnectDependencies();
            db.SortDependencies();
            return db.SortedJsFiles;
        }

        protected IEnumerable<JsFile> Peak()
        {
            return CollectFiles()
                .Select(fi => ParseFileMetadata(fi.FullName));
        }

        protected IEnumerable<FileInfo> CollectFiles()
        {
            return ScriptsDirectory.GetFiles("*.js", ShouldSearchSubDirectories ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
        }

        protected JsFile ParseFileMetadata(string fullPath)
        {
            var jf = new JsFile
            {
                FullPath = fullPath,
                JsRefs = new List<JsRef>(),
            };
            using (var sr = new StreamReader(fullPath))
            {
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    if (CANCEL_REF_REGEX.IsMatch(line))
                        break;
                    var match = JS_REF_REGEX.Match(line);
                    if (match.Success)
                    {
                        jf.JsRefs.Add(new JsRef { RefPath = match.Groups["filename"].Value });
                    }
                }
            }
            jf.ResolveRefs();
            return jf;
        }

        protected void WriteDebugIncludes(IEnumerable<JsFile> orderedFiles)
        {
            if (string.IsNullOrWhiteSpace(IncludesFilePath))
                return;
            var tempfi = new FileInfo(Guid.NewGuid().ToString() + ".temp");
            try
            {
                using (var sw = new StreamWriter(tempfi.FullName) { AutoFlush = true })
                {
                    foreach (var jf in orderedFiles)
                    {
                        sw.WriteLine(JS_INCLUDE_FORMAT, jf.GetPathRelativeTo(BaseIncludesPath));
                    }
                }
                File.Copy(tempfi.FullName, IncludesFilePath, true);
            }
            finally
            {
                if (tempfi.Exists)
                    tempfi.Delete();
            }
        }

        protected void WriteCombinedJavascript(IEnumerable<JsFile> orderedFiles)
        {
            var tempfi = new FileInfo(Guid.NewGuid().ToString() + ".temp");
            try
            {
                using (var sw = new StreamWriter(tempfi.FullName) { AutoFlush = true })
                {
                    foreach (var jf in orderedFiles)
                    {
                        jf.WriteToStream(sw);
                        sw.WriteLine();
                    }
                }
                File.Copy(tempfi.FullName, DeployPath, true);
            }
            finally
            {
                if (tempfi.Exists)
                    tempfi.Delete();
            }
        }
    }
}