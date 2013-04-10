using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace JsSingularity
{
    public class Combiner
    {
        private static readonly Regex JS_REF_REGEX = new Regex(@"///\s?<reference\spath=""(?<filename>[^\\:*?""<>|\r\n]+\.js)""\s?/>", RegexOptions.Compiled);
        private static readonly Regex TS_REF_REGEX = new Regex(@"///\s?<reference\spath=""(?<filename>[^\\:*?""<>|\r\n]+\.ts)""\s?/>", RegexOptions.Compiled);
        private static readonly Regex CANCEL_REF_REGEX = new Regex(@"///\s*CODE", RegexOptions.Compiled);

        //private static readonly string JS_INCLUDE_FORMAT = "<script src=\"{0}\" type=\"text/javascript\"></script>";
        private static readonly string JS_INCLUDE_FORMAT = "{0}";
        
        public Combiner()
        {
        }

        public bool ShouldSearchSubDirectories { get; set; }
        public string ScriptsFolder { get; set; }
        public string DeployPath { get; set; }
        public string IncludesFilePath { get; set; }
        public string BaseIncludesPath { get; set; }
        public bool IsDebug { get; set; }
        public bool IsInTSMode { get; set; }
        public string TsIncludeFile { get; set; }
        public string TsIncludeFormat { get; set; }

        protected DirectoryInfo ScriptsDirectory { get; set; }

        public void Combine()
        {
            ScriptsDirectory = new DirectoryInfo(ScriptsFolder);

            var orderedFiles = CollectOrderedFiles().ToList();
            WriteDebugIncludes(orderedFiles);
            WriteTsIncludeFile(orderedFiles);
            if (!string.IsNullOrWhiteSpace(DeployPath))
                WriteCombinedJavascript(orderedFiles);
        }

        protected IEnumerable<JsFile> CollectOrderedFiles()
        {   
            var db = new DependencyBroker
            {
                AllJsFiles = Peak().ToList(),
                IsDebug = IsDebug,
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
            if (IsInTSMode)
                return ScriptsDirectory.GetFiles("*.ts", ShouldSearchSubDirectories ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
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
                    Match match;
                    if (IsInTSMode)
                        match = TS_REF_REGEX.Match(line);
                    else
                        match = JS_REF_REGEX.Match(line);
                    if (match.Success)
                    {
                        var relativeFilename = match.Groups["filename"].Value;
                        if (string.IsNullOrWhiteSpace(relativeFilename))
                            continue;
                        relativeFilename = relativeFilename.Replace("/", "\\");
                        jf.JsRefs.Add(new JsRef { RefPath = relativeFilename });
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
                        string relativePath = jf.GetPathRelativeTo(BaseIncludesPath);
                        if (new FileInfo(relativePath).Extension == ".ts")
                            relativePath = relativePath.Substring(0, relativePath.Length - 3) + ".js";
                        sw.WriteLine(JS_INCLUDE_FORMAT, relativePath);
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

        protected void WriteTsIncludeFile(IEnumerable<JsFile> orderedFiles)
        {
            if (string.IsNullOrWhiteSpace(TsIncludeFile))
                return;
            
            var format = TsIncludeFormat;
            bool isFull = false;
            bool useFileSystemFormat = false;
            if (format != null && format.StartsWith("?"))
            {
                var index = format.IndexOf("||") + 2;
                var modifiers = (format.Substring(0, index) ?? "").ToLower();
                format = format.Substring(index);
                isFull = modifiers.Contains("f");
                useFileSystemFormat = modifiers.Contains("s");
            }
            if (string.IsNullOrWhiteSpace(format))
                format = "{0}";

            var tempfi = new FileInfo(Guid.NewGuid().ToString() + ".temp");
            try
            {
                using (var sw = new StreamWriter(tempfi.FullName) { AutoFlush = true })
                {
                    foreach (var jf in orderedFiles)
                    {
                        string relativePath = jf.GetPathRelativeTo(BaseIncludesPath);
                        if (new FileInfo(relativePath).Extension == ".ts")
                        {
                            if (isFull)
                                sw.WriteLine(format, new FileInfo(relativePath).FullName);
                            else if (useFileSystemFormat)
                                sw.WriteLine(format, relativePath.Replace("/", "\\"));
                            else
                                sw.WriteLine(format, relativePath);
                        }
                    }
                }
                File.Copy(tempfi.FullName, TsIncludeFile, true);
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
                var fi = new FileInfo(DeployPath);
                if (!fi.Directory.Exists)
                    fi.Directory.Create();
                File.Copy(tempfi.FullName, fi.FullName, true);
            }
            catch (Exception )
            {
                Console.WriteLine(string.Format("Error in WriteCombinedJavascript [DeployPath={0}]", DeployPath));
                throw;
            }
            finally
            {
                if (tempfi.Exists)
                    tempfi.Delete();
            }
        }
    }
}