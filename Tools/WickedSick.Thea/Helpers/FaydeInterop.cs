using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
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
            InvalidateCache();
        }

        public bool IsCacheInvalidated
        {
            get
            {
                IsAlive = VerifyInterop();
                return IsAlive && Eval("App.Current.DebugInterop.IsCacheInvalidated") == "true";
            }
        }
        public bool IsAlive { get; protected set; }

        public void InvalidateCache()
        {
            try
            {
                Execute("if (window.App && App.Current.DebugInterop) App.Current.DebugInterop.InvalidateCache();");
            }
            catch (Exception)
            {
            }
        }

        public IEnumerable<VisualViewModel> GetVisualTree()
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return Enumerable.Empty<VisualViewModel>();

            var json = RunFunc("GetCache");
            var serializer = new DataContractJsonSerializer(typeof(DebugInteropCache));
            try
            {
                using (var ms = new MemoryStream(System.Text.UTF8Encoding.UTF8.GetBytes(json)))
                {
                    var cache = serializer.ReadObject(ms) as DebugInteropCache;
                    if (cache != null)
                        return cache.Children.Select(CreateVisualViewModel);
                }
            }
            catch (Exception)
            {
                //What to do?
            }
            return Enumerable.Empty<VisualViewModel>();
        }
        protected VisualViewModel CreateVisualViewModel(DebugInteropCache cache)
        {
            var vvm = new VisualViewModel
            {
                ID = cache.ID.ToString(),
                Name = cache.Name,
                TypeName = cache.TypeName,
            };
            if (string.IsNullOrWhiteSpace(vvm.Name))
                vvm.Name = null;
            if (cache.Children != null)
                vvm.VisualChildren = new ObservableCollection<VisualViewModel>(cache.Children.Select(CreateVisualViewModel));
            return vvm;
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

        public IEnumerable<DependencyPropertyCache> GetDependencyProperties()
        {
            var json = RunFunc("GetDPCache");
            var serializer = new DataContractJsonSerializer(typeof(List<DependencyPropertyCache>));
            try
            {
                using (var ms = new MemoryStream(System.Text.UTF8Encoding.UTF8.GetBytes(json)))
                {
                    return serializer.ReadObject(ms) as List<DependencyPropertyCache>;
                }
            }
            catch (Exception)
            {
                //What to do?
            }
            return Enumerable.Empty<DependencyPropertyCache>();
        }

        public void PopulateProperties(VisualViewModel vvm)
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return;

            var formattedArr = RunFunc("GetProperties", vvm.ID);
            var props = ParseDependencyValueArray(formattedArr)
                .OrderBy(dv => dv.OwnerTypeName)
                .ThenBy(dv => dv.Name)
                .ToList();
            vvm.Properties.Clear();
            foreach (var p in props)
                vvm.Properties.Add(p);
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