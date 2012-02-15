using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System;

namespace JsSingularity
{
    [DebuggerDisplay("{FullPath}")]
    public class JsFile
    {
        public string FullPath { get; set; }
        public List<JsRef> JsRefs { get; set; }
        public bool HasNoDependencies { get { return !JsRefs.Any(); } }

        public void ResolveRefs()
        {
            var fs = new FolderStack(new FileInfo(FullPath).Directory);
            var unresolved = JsRefs.Where(jr => !jr.Resolve(ref fs)).ToList();
            foreach (var jr in unresolved)
            {
                Console.WriteLine(string.Format("Could not resolve reference: {0} in file: {1}", jr.RefPath, new FileInfo(FullPath).Name));
            }
        }

        public void FindRefs(List<JsFile> files)
        {
            foreach (var jref in JsRefs)
            {
                if (!jref.Exists)
                    continue;
                jref.InternalFile = files.FirstOrDefault(jf => jf.Matches(jref));
            }
        }

        public void WriteToStream(StreamWriter sw)
        {
            using (var sr = new StreamReader(FullPath))
            {
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    if (ShouldWriteLine(line))
                    sw.WriteLine(line);
                }
            }
        }

        public string GetPathRelativeTo(string basePath)
        {
            var dir = new DirectoryInfo(basePath);

            var baseFs = new FolderStack(dir);
            var fileFs = new FolderStack(new FileInfo(FullPath).Directory);
            var kickedStack = new Stack<DirectoryInfo>();

            string temp = string.Empty;
            while (baseFs.CurrentDirectory.FullName != fileFs.CurrentDirectory.FullName)
            {
                if (baseFs.CurrentDirectory.FullName.Length > fileFs.CurrentDirectory.FullName.Length)
                {
                    baseFs.Pop();
                    temp += "../";
                }
                else
                    kickedStack.Push(fileFs.Pop());
            }
            while (kickedStack.Any())
            {
                temp += kickedStack.Pop().Name + "/";
            }
            temp += new FileInfo(FullPath).Name;
            return temp;
        }

        public bool Matches(JsFile other)
        {
            return string.Equals(this.FullPath, other.FullPath, System.StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Matches(JsRef jref)
        {
            return string.Equals(this.FullPath, jref.ResolvedPath, System.StringComparison.CurrentCultureIgnoreCase);
        }

        private bool ShouldWriteLine(string line)
        {
            if (string.IsNullOrWhiteSpace(line))
                return false;
            line = line.Trim();
            if (line.StartsWith("//"))
                return false;
            return true;
        }
    }
}
