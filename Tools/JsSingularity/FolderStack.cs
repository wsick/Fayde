using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace JsSingularity
{
	public class FolderStack
	{
        private FolderStack _ParentStack;
        private DirectoryInfo _BaseDirectory;
        private DirectoryInfo _CurrentDirectory;

        public DirectoryInfo CurrentDirectory { get { return _CurrentDirectory ?? _BaseDirectory; } }

        public FolderStack(DirectoryInfo di)
        {
            _BaseDirectory = di;
        }

        public bool Push(string directory)
        {
            _CurrentDirectory = new DirectoryInfo(Path.Combine(_CurrentDirectory.FullName, directory));
            return _CurrentDirectory.Exists;
        }

        public DirectoryInfo Pop()
        {
            if (_CurrentDirectory == null)
                return null;
            _CurrentDirectory = _CurrentDirectory.Parent;
            return _CurrentDirectory;
        }

        public FolderStack Save()
        {
            return new FolderStack(_BaseDirectory) { _ParentStack = this, };
        }

        public FolderStack Restore()
        {
            return this._ParentStack;
        }
	}
}
