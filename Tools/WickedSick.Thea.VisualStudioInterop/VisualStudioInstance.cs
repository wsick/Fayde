using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using EnvDTE;

namespace WickedSick.Thea.VisualStudioInterop
{
    public class VisualStudioInstance
    {
        private _DTE _DTEInstance;

        protected dynamic GetDebugger()
        {
            if (_DTEInstance == null)
                return null;

            ComMessageFilter.Register();
            try
            {
                return _DTEInstance.Debugger;
            }
            finally
            {
                ComMessageFilter.Revoke();
            }
        }

        public VisualStudioInstance(int processID)
        {
            ProcessID = processID;
        }
        
        public int ProcessID { get; protected set; }
        public string ProcessTitle { get; set; }
        public bool IsProcessAlive
        {
            get
            {
                var process = System.Diagnostics.Process.GetProcessById(ProcessID);
                return process != null;
            }
        }
        public bool IsDebugging
        {
            get
            {
                try
                {
                    var debugger = GetDebugger();
                    if (debugger == null)
                        return false;
                    var processes = debugger.DebuggedProcesses;
                    if (processes == null)
                        return false;
                    return processes.Count > 0;
                }
                catch (COMException cex)
                {
                    //if user is interacting with visual studio debugger visualizer, the call will be rejected
                    if (IsRejectedCall(cex))
                    {
                        Debug.WriteLine("Rejected call.");
                        return true;
                    }
                    return false;
                }
            }
        }

        public bool Attach()
        {
            IntPtr numFetched = IntPtr.Zero;
            IRunningObjectTable runningObjectTable;
            IEnumMoniker monikerEnumerator;
            IMoniker[] monikers = new IMoniker[1];

            NativeMethods.GetRunningObjectTable(0, out runningObjectTable);
            runningObjectTable.EnumRunning(out monikerEnumerator);
            monikerEnumerator.Reset();

            while (monikerEnumerator.Next(1, monikers, numFetched) == 0)
            {
                IBindCtx ctx;
                NativeMethods.CreateBindCtx(0, out ctx);

                string runningObjectName;
                monikers[0].GetDisplayName(ctx, null, out runningObjectName);

                object runningObjectVal;
                runningObjectTable.GetObject(monikers[0], out runningObjectVal);

                if (runningObjectVal is _DTE && runningObjectName.StartsWith("!VisualStudio"))
                {
                    int currentProcessId = int.Parse(runningObjectName.Split(':')[1]);

                    if (currentProcessId == ProcessID)
                    {
                        _DTEInstance = (_DTE)runningObjectVal;
                        return true;
                    }
                }
            }
            _DTEInstance = null;
            return false;
        }

        public string GetExpression(string expression)
        {
            var debugger = GetDebugger();
            if (debugger == null)
                return null;
            EnvDTE.Expression obj;
            try
            {
                obj = debugger.GetExpression(string.Format("({0}).toString()", expression), false, 1000);
                if (obj == null)
                    return null;
                if (!obj.IsValidValue)
                    return null;
                var value = obj.Value;
                switch (obj.Type)
                {
                    case "String":
                        if (value.StartsWith("\""))
                            value = value.Substring(1);
                        if (value.EndsWith("\""))
                            value = value.Length > 1 ? value.Substring(0, value.Length - 1) : "";
                        break;
                }
                return value;
            }
            catch (COMException cex)
            {
                HandleCOMException(cex);
            }
            return null;
        }

        public void ExecuteStatement(string expression)
        {
            var debugger = GetDebugger();
            if (debugger == null)
                return;
            try
            {
                debugger.ExecuteStatement(expression, 1000, true);
            }
            catch (COMException cex)
            {
                HandleCOMException(cex);
            }
        }

        public IEnumerable<EnvDTE.Process> GetDebuggedProcesses()
        {
            var debugger = GetDebugger();
            if (debugger != null)
            {
                dynamic processes = debugger.DebuggedProcesses;
                if (processes != null)
                {
                    for (int i = 1; i <= processes.Count; i++)
                    {
                        var p = processes.Item(i);
                        //p.Name.ToString();
                        //p.ProcessID.ToString();
                        yield return processes.Item(i);
                    }
                }
            }
        }


        private void HandleCOMException(COMException cex)
        {
            if (IsContextNotAvailable(cex))
            {
                Debug.WriteLine("Context not available.");
                throw new ContextNotAvailableException(cex);
            }
            if (IsRejectedCall(cex))
            {
                Debug.WriteLine("Rejected call.");
                throw new ContextNotAvailableException(cex);
            }

            try { System.Runtime.InteropServices.Marshal.ThrowExceptionForHR(cex.ErrorCode); }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }
        }

        private static bool IsContextNotAvailable(COMException cex)
        {
            unchecked
            {
                return cex.ErrorCode == (int)0x89711006;
            }
        }

        private static bool IsRejectedCall(COMException cex)
        {
            // "Call was rejected by callee. (Exception from HRESULT: 0x80010001 (RPC_E_CALL_REJECTED))"
            unchecked
            {
                return cex.ErrorCode == (int)0x80010001;
            }
        }
    }
}