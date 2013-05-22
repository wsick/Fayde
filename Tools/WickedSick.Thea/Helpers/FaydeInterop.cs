using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
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
            var cache = ParseJson<DebugInteropCache>(json);
            if (cache == null)
                return Enumerable.Empty<VisualViewModel>();
            return cache.Children.Select(CreateVisualViewModel);
        }
        protected VisualViewModel CreateVisualViewModel(DebugInteropCache cache)
        {
            var vvm = new VisualViewModel
            {
                ID = cache.ID,
                Name = cache.Name,
                TypeName = cache.TypeName,
            };
            if (string.IsNullOrWhiteSpace(vvm.Name))
                vvm.Name = null;
            if (cache.Children != null)
                vvm.VisualChildren = new ObservableCollection<VisualViewModel>(cache.Children.Select(CreateVisualViewModel));
            return vvm;
        }

        public IEnumerable<int> GetVisualIDsInHitTest()
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return Enumerable.Empty<int>();

            var json = RunFunc("GetVisualIDsInHitTest");
            return DeserializeList<int>(json);
        }

        public void AttachToVisualStudio(VisualStudioInstance instance)
        {
            _VSI = instance;
            _VSI.Attach();
        }

        public IEnumerable<DependencyPropertyCache> GetDependencyProperties()
        {
            var json = RunFunc("GetDPCache");
            return ParseJson<List<DependencyPropertyCache>>(json) 
                ?? Enumerable.Empty<DependencyPropertyCache>();
        }

        public IEnumerable<PropertyStorageWrapper> GetStorages(int id)
        {
            IsAlive = VerifyInterop();
            if (!IsAlive)
                return Enumerable.Empty<PropertyStorageWrapper>();

            var json = RunFunc("GetStorages", id.ToString());

            return DeserializeList(json)
                .Select(d => new PropertyStorageWrapper { DynamicObject = d, })
                .ToList();
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
            if (obj == vvm.ID.ToString())
                vvm.IsThisOnStackFrame = true;
        }

        private static T ParseJson<T>(string json) where T : class
        {
            var serializer = new DataContractJsonSerializer(typeof(T));
            try
            {
                using (var ms = new MemoryStream(System.Text.UTF8Encoding.UTF8.GetBytes(json)))
                {
                    return serializer.ReadObject(ms) as T;
                }
            }
            catch (Exception)
            {
                return default(T);
            }
        }

        private static List<dynamic> DeserializeList(string json)
        {
            dynamic result = JsonConvert.DeserializeObject<dynamic>(json) ?? Enumerable.Empty<dynamic>();
            var list = new List<dynamic>();
            foreach (dynamic d in result)
            {
                list.Add(d);
            }
            return list;
        }

        private static List<T> DeserializeList<T>(string json)
        {
            dynamic result = JsonConvert.DeserializeObject<dynamic>(json) ?? Enumerable.Empty<dynamic>();
            var list = new List<T>();
            foreach (dynamic d in result)
            {
                list.Add((T)d.Value);
            }
            return list;
        }
    }
}