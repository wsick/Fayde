using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;

namespace WickedSick.Thea.VisualStudioInterop
{
    internal class NativeMethods
    {
        [DllImport("ole32.dll")]
        internal static extern int GetRunningObjectTable(int reserved, out IRunningObjectTable prot);

        [DllImport("ole32.dll")]
        internal static extern int CreateBindCtx(int reserved, out IBindCtx ppbc);
    }
}