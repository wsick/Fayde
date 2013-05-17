using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Serialization;
using System.Windows;
using WickedSick.MVVM;
using WickedSick.Thea.Helpers;

namespace WickedSick.Thea.ViewModels
{
    public class ExamineViewModel : ViewModelBase
    {
        public static ExamineViewModel CreateAndRun(IJavascriptContext jsContext, VisualViewModel visual, string text)
        {
            var vm = new ExamineViewModel
            {
                JsContext = jsContext,
                Visual = visual,
                ExamineText = text,
            };
            vm.Run();
            return vm;
        }

        #region Properties

        protected IJavascriptContext JsContext { get; set; }

        private VisualViewModel _Visual;
        public VisualViewModel Visual
        {
            get { return _Visual; }
            set
            {
                _Visual = value;
                OnPropertyChanged("Visual");
            }
        }

        private string _ExamineText;
        public string ExamineText
        {
            get { return _ExamineText; }
            set
            {
                _ExamineText = value;
                OnPropertyChanged("ExamineText");
            }
        }

        private IDictionary<string, object> _ObjectStructure;
        public IDictionary<string, object> ObjectStructure
        {
            get { return _ObjectStructure; }
            set
            {
                _ObjectStructure = value;
                OnPropertyChanged("ObjectStructure");
            }
        }

        #endregion

        protected void Run()
        {
            var resolution = Visual.ResolveVisualWithJavascript();
            if (!string.IsNullOrWhiteSpace(ExamineText))
                resolution += "." + ExamineText;
            var js = string.Format("FaydeInterop.StringifyEx({0})", resolution);
            string json;
            try
            {
                json = JsContext.Eval(js);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error examining: " + ex.Message, "Eval Error", MessageBoxButton.OK);
                return;
            }
            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            try
            {
                ObjectStructure = serializer.Deserialize<IDictionary<string, object>>(json);
            }
            catch (InvalidOperationException)
            {
                try
                {
                    ObjectStructure = serializer.Deserialize<object[]>(json)
                        .Select((o, i) => new { Key = i, Value = o })
                        .ToDictionary(a => a.Key.ToString(), a => a.Value);
                }
                catch (InvalidOperationException)
                {
                    if (json.StartsWith("\"") && json.EndsWith("\""))
                    {
                        ObjectStructure = new Dictionary<string, object>
                        {
                            { "Value", json }
                        };
                    }
                }
            }
        }
    }
}