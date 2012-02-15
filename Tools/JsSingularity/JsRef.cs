using System;
using System.IO;
using System.Linq;

namespace JsSingularity
{
    public class JsRef
    {
        public string RefPath { get; set; }
        public string ResolvedPath { get; set; }
        public bool Exists { get; set; }
        public JsFile InternalFile { get; set; }

        public bool Resolve(ref FolderStack fs)
        {
            fs = fs.Save();
            try
            {
                var tempfs = fs;
                var filename = RefPath;
                if (RefPath.Contains("\\"))
                {
                    var tokens = RefPath.Split('\\');
                    var dirs = tokens.Take(tokens.Length - 1);
                    filename = tokens.Last();
                    dirs.TakeWhile(dir => ProcessDirectory(tempfs, dir)).ToList();
                }
                ResolvedPath = Path.Combine(tempfs.CurrentDirectory.FullName, filename);
                Exists = File.Exists(ResolvedPath);
                return Exists;
            }
            finally
            {
                fs = fs.Restore();
            }
        }

        private bool ProcessDirectory(FolderStack fs, string curDir)
        {
            if (curDir == "..")
                return fs.Pop() != null;
            return fs.Push(curDir);
        }
    }
}
