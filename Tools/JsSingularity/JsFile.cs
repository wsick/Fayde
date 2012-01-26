using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

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
            JsRefs.ForEach(jr => jr.Resolve(ref fs));
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
                    sw.WriteLine(sr.ReadLine());
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
    }
}
