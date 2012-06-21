using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace WickedSick.Thea.VisualStudioInterop
{
    public class VisualStudioBroker
    {
        public static IEnumerable<VisualStudioInstance> GetInstances()
        {
            return System.Diagnostics.Process.GetProcesses()
                .OrderBy(p => p.ProcessName)
                .Where(IsVisualStudio)
                .Select(InstanceFromProcess)
                .ToList();
        }

        private static bool IsVisualStudio(Process p)
        {
            return p.ProcessName.StartsWith("devenv");
        }

        private static VisualStudioInstance InstanceFromProcess(Process p)
        {
            return new VisualStudioInstance(p.Id)
            {
                ProcessTitle = p.MainWindowTitle,
            };
        }
    }
}