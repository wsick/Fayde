using System.Collections.Generic;
using System.Web.Script.Serialization;
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
            string js = "(function () { return (";
            js += Visual.ResolveVisualWithJavascript((int)JsContext.ID);
            js += ")";
            if (!string.IsNullOrWhiteSpace(ExamineText))
                js += "." + ExamineText;
            js += "; })()";
            js = string.Format("JSON.stringify({0})", js);
            var json = JsContext.Eval(js);
            var serializer = new JavaScriptSerializer();
            ObjectStructure = serializer.Deserialize<IDictionary<string, object>>(json);
        }
    }
}