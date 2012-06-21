using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using EnvDTE;

namespace WickedSick.Thea.VisualStudioInterop
{
    public class ConsoleTest
    {
        public static void Main(string[] args)
        {
            var instances = VisualStudioBroker.GetInstances().ToList();
            if (instances.Count < 1)
            {
                Console.WriteLine("No instances");
                Console.ReadLine();
                return;
            }
            for (int i = 0; i < instances.Count; i++)
            {
                Console.WriteLine("{0}: {1} [{2}]", i + 1, instances[i].ProcessTitle, instances[i].ProcessID);
            }
            int instanceIndex;
            string line;
            do
            {
                line = Console.ReadLine();
            } while (!int.TryParse(line, out instanceIndex) && (instanceIndex - 1) > 0 && (instanceIndex - 1) < instances.Count);

            var attachedVS = instances[instanceIndex - 1];
            attachedVS.Attach();
            Console.WriteLine(attachedVS.GetExpression("VisualTreeHelper.__Debug()"));
            Console.ReadLine();
        }
    }
}