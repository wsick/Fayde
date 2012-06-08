using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WatiN.Core;
using WickedSick.Thea.ViewModels;

namespace WickedSick.Thea.Helpers
{
    public class FaydeInterop
    {
        private static readonly string INITIALIZATION_SCRIPT = "(function() { var fi = new FaydeInterop(App.Instance); return fi._ID; })();";

        private Browser _Browser;
        private int? _ID = null;

        public FaydeInterop(Browser browser)
        {
            _Browser = browser;
            InitializeFaydeInteropJs();
            int id;
            if (int.TryParse(_Browser.Eval(INITIALIZATION_SCRIPT), out id))
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
            var tuple = DeserializeVisual(_Browser.Eval(js));
            tuple.Item1.IndexPath = indexPath;
            return tuple;
        }

        private static Tuple<VisualViewModel, int> DeserializeVisual(string formatted)
        {
            var tokens = formatted.Split(new[] { "~|~" }, StringSplitOptions.None);
            var childCount = int.Parse(tokens[2]);
            var vvm = new VisualViewModel
            {
                Type = tokens[0],
                Name = tokens[1],
            };
            if (string.IsNullOrWhiteSpace(vvm.Name))
                vvm.Name = null;
            return Tuple.Create(vvm, childCount);
        }

        private void InitializeFaydeInteropJs()
        {
            var jsStream = this.GetType().Assembly.GetManifestResourceStream("WickedSick.Thea.Helpers.FaydeInterop.js");
            using (var sr = new StreamReader(jsStream))
            {
                var js = sr.ReadToEnd();
                _Browser.RunScript(js);
            }
        }

        private string RunFunc(string functionName)
        {
            return _Browser.Eval(string.Format("FaydeInterop.Reg[{0}].{1}();", this._ID, functionName));
        }
    }
}