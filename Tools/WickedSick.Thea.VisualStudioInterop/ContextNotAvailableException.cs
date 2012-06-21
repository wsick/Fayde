using System;
using System.Runtime.InteropServices;

namespace WickedSick.Thea.VisualStudioInterop
{
    public class ContextNotAvailableException : Exception
    {
        public ContextNotAvailableException(COMException cex)
            : base("Context is not available in Visual Studio.", cex)
        {
        }
    }
}