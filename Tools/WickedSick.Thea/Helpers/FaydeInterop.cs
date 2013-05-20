using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;
using WatiN.Core;
using WatiN.Core.Exceptions;
using WickedSick.Thea.Models;
using WickedSick.Thea.ViewModels;
using WickedSick.Thea.VisualStudioInterop;

namespace WickedSick.Thea.Helpers
{
    public class FaydeInterop : IJavascriptContext
    {
        private Browser _Browser;
        private VisualStudioInstance _VSI;

        public FaydeInterop(Browser browser)
        {
            _Browser = browser;
        }

        public bool IsCacheInvalidated
        {
            get
            {
                IsAlive = VerifyInterop();
                return IsAlive && Eval("App.Current.DebugInterop._IsCacheInvalidated") == "true";
            }
        }
        public bool IsAlive { get; protected set; }

        public IEnumerable<VisualViewModel> GetVisualTree()
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return Enumerable.Empty<VisualViewModel>();

            RunFunc("GenerateCache");

            var indexStack = new Stack<int>();
            var tuple = GetVisual(indexStack);
            GetVisualTreeChildren(tuple, indexStack);
            return tuple.Item1.VisualChildren;
        }
        public void PopulateProperties(VisualViewModel vvm)
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return;

            var formattedArr = RunFunc("GetProperties", GetJsCodeToGetVisual(vvm));
            var props = ParseDependencyValueArray(formattedArr)
                .OrderBy(dv => dv.OwnerTypeName)
                .ThenBy(dv => dv.Name)
                .ToList();
            vvm.Properties.Clear();
            foreach (var p in props)
                vvm.Properties.Add(p);
        }
        public IEnumerable<string> GetVisualIDsInHitTest()
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return Enumerable.Empty<string>();

            var formattedArr = RunFunc("GetVisualIDsInHitTest");
            return ParseStringArray(formattedArr);
        }


        public void AttachToVisualStudio(VisualStudioInstance instance)
        {
            _VSI = instance;
            _VSI.Attach();
        }

        private void GetVisualTreeChildren(Tuple<VisualViewModel, int> rootTuple, Stack<int> indexStack)
        {
            for (int i = 0; i < rootTuple.Item2; i++)
            {
                indexStack.Push(i);
                var tuple = GetVisual(indexStack);
                rootTuple.Item1.VisualChildren.Add(tuple.Item1);
                GetVisualTreeChildren(tuple, indexStack);
                indexStack.Pop();
            }
        }
        private Tuple<VisualViewModel, int> GetVisual(IEnumerable<int> indices)
        {
            var indexPath = string.Join("", indices.Reverse().Select(i => string.Format(".Children[{0}]", i)));
            string js = string.Format("App.Current.DebugInterop._Cache{0}.Serialized", indexPath);
            var tuple = DeserializeVisual(_Browser.Eval(js));
            tuple.Item1.IndexPath = indexPath;
            RefreshIsThisOnStackFrame(tuple.Item1);
            return tuple;
        }
        private static Tuple<VisualViewModel, int> DeserializeVisual(string formatted)
        {
            var tokens = formatted.Split(new[] { "~|~" }, StringSplitOptions.None);
            VisualViewModel vvm;
            int childCount;
            if (tokens[0] == "Surface")
            {
                vvm = new VisualViewModel
                {
                    ID = "-1",
                    Name = "MainSurface",
                    Type = "Surface",
                };
                childCount = int.Parse(tokens[1]);
            }
            else
            {
                vvm = new VisualViewModel
                {
                    ID = tokens[0],
                    Name = tokens[1],
                    Type = tokens[2],
                };
                childCount = int.Parse(tokens[3]);
            }
            if (string.IsNullOrWhiteSpace(vvm.Name))
                vvm.Name = null;
            return Tuple.Create(vvm, childCount);
        }
        private static IEnumerable<DependencyValue> ParseDependencyValueArray(string s)
        {
            var js = new JavaScriptSerializer();
            dynamic obj = js.Deserialize(s, typeof(object));
            for (int i = 0; i < obj.Length; i++)
			{
                var ownerTypeName = obj[i]["OwnerType"].ToString();
                var name = obj[i]["Name"].ToString();
                var value = (obj[i]["Value"] ?? string.Empty).ToString();
                yield return new DependencyValue
                {
                    OwnerTypeName = ownerTypeName,
                    Name = name,
                    Value = value,
                };
			}
        }
        private static IEnumerable<string> ParseStringArray(string s)
        {
            var js = new JavaScriptSerializer();
            dynamic obj = js.Deserialize(s, typeof(object));
            for (int i = 0; i < obj.Length; i++)
            {
                object o = obj[i];
                if (o != null)
                    yield return o.ToString();
            }
        }


        #region Execution Wrapper

        protected bool VerifyInterop()
        {
            try
            {
                return !string.IsNullOrWhiteSpace(Eval("App.Current.DebugInterop"));
            }
            catch (JavaScriptException)
            {
                return false;
            }
        }
        public void Execute(string script)
        {
            if (_VSI != null && _VSI.IsDebugging)
            {
                try
                {
                    _VSI.ExecuteStatement(script);
                }
                catch (ContextNotAvailableException)
                {
                    _Browser.RunScript(script);
                }
                return;
            }
            _Browser.RunScript(script);
        }
        public string Eval(string expression)
        {
            if (_VSI != null && _VSI.IsDebugging)
            {
                try
                {
                    return _VSI.GetExpression(expression);
                }
                catch (ContextNotAvailableException)
                {
                }
            }
            return _Browser.Eval(expression);
        }
        public string EvalAgainstStackFrame(string expression)
        {
            if (_VSI != null && _VSI.IsDebugging)
            {
                try
                {
                    return _VSI.GetExpression(expression);
                }
                catch (ContextNotAvailableException)
                {
                }
            }
            return null;
        }

        #endregion

        #region Fayde Interop Js Wrapper

        private string GetJsCodeToGetVisual(VisualViewModel vvm)
        {
            return vvm.ResolveVisualWithJavascript();
        }
        private string RunFunc(string functionName, string args = null)
        {
            return Eval(string.Format("App.Current.DebugInterop.{0}({1})", functionName, args));
        }

        #endregion

        private void RefreshIsThisOnStackFrame(VisualViewModel vvm)
        {
            vvm.IsThisOnStackFrame = false;
            if (_VSI == null)
                return;
            var obj = _VSI.GetExpression("this._ID") as string;
            if (obj == null)
                return;
            if (obj == vvm.ID)
                vvm.IsThisOnStackFrame = true;
        }
    }
}