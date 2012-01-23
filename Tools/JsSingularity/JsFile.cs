using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Diagnostics;

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
