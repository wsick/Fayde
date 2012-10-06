using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;
using Awesomium.Core;
using WickedSick.FaydeSpy.Models;
using WickedSick.FaydeSpy.ViewModels;

namespace WickedSick.FaydeSpy.Interop
{
    public class FaydeInterop
    {
        private static readonly string INITIALIZATION_SCRIPT = "(function() { var fi = new FaydeInterop(App.Instance); return fi._ID; })();";

        private IWebViewJavaScript _JsEngine;
        private int? _ID = null;

        public FaydeInterop(IWebViewJavaScript jsEngine)
        {
            _JsEngine = jsEngine;
            InitializeFaydeInteropJs();
            int id;
            if (int.TryParse(Eval(INITIALIZATION_SCRIPT), out id))
                _ID = id;
        }

        public IEnumerable<VisualViewModel> GetVisualTree()
        {
            RunFunc("GenerateCache");

            var indexStack = new Stack<int>();
            var tuple = GetVisual(indexStack);
            GetVisualTreeChildren(tuple, indexStack);
            return tuple.Item1.VisualChildren;
        }

        public void PopulateProperties(VisualViewModel vvm)
        {
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
            var formattedArr = RunFunc("GetVisualIDsInHitTest");
            return ParseStringArray(formattedArr);
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
            string js = string.Format("FaydeInterop.Reg[{0}]._Cache{1}.Serialized", this._ID, indexPath);
            var tuple = DeserializeVisual(Eval(js));
            tuple.Item1.IndexPath = indexPath;
            return tuple;
        }

        private static Tuple<VisualViewModel, int> DeserializeVisual(string formatted)
        {
            var tokens = formatted.Split(new[] { "~|~" }, StringSplitOptions.None);
            var childCount = int.Parse(tokens[3]);
            var vvm = new VisualViewModel
            {
                Type = tokens[0],
                Name = tokens[1],
                ID = tokens[2],
            };
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

        private void RunScript(string script)
        {
            _JsEngine.ExecuteJavascript(script);
        }

        private string Eval(string expression)
        {
            var jsVal = _JsEngine.ExecuteJavascriptWithResult(expression);
            return jsVal.ToString();
        }

        #endregion

        #region Fayde Interop Js Wrapper

        private void InitializeFaydeInteropJs()
        {
            var jsStream = this.GetType().Assembly.GetManifestResourceStream("WickedSick.FaydeSpy.Interop.FaydeInterop.js");
            using (var sr = new StreamReader(jsStream))
            {
                var js = sr.ReadToEnd();
                RunScript(js);
            }
        }

        private string GetJsCodeToGetVisual(VisualViewModel vvm)
        {
            return string.Format("FaydeInterop.Reg[{0}]._Cache{1}.Visual", this._ID, vvm.IndexPath);
        }

        private string RunFunc(string functionName, string args = null)
        {
            return Eval(string.Format("FaydeInterop.Reg[{0}].{1}({2})", this._ID, functionName, args));
        }

        #endregion
    }
}