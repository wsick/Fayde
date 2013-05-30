using System;
using System.Collections.ObjectModel;
using System.Linq;
using WickedSick.MVVM;
using WickedSick.Thea.Helpers;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.ViewModels
{
    public class PerformanceViewModel : ViewModelBase
    {
        private ObservableCollection<FrameInfo> _FramesPerSecond = new ObservableCollection<FrameInfo>();
        public ObservableCollection<FrameInfo> FramesPerSecond
        {
            get { return _FramesPerSecond; }
            set
            {
                _FramesPerSecond = value;
                OnPropertyChanged("FramesPerSecond");
            }
        }

        public IJavascriptContext JsContext { get; set; }

        public void Update()
        {
            var info = GetFrameInfo();
            if (info == null)
                return;
            if (FramesPerSecond.Count < 1)
                info.TimeDiff = 0.0;
            FramesPerSecond.Add(info);
        }

        protected FrameInfo GetFrameInfo()
        {
            if (JsContext == null)
                return null;
            if (!JsContext.IsAlive)
                return null;
            var info = JsContext.Eval("App.Current.DebugInterop.GetResetPerfInfo()");
            var tokens = info.Split(';');

            int numFrames = 0;
            int.TryParse(tokens.FirstOrDefault(), out numFrames);
            numFrames = Math.Min(numFrames, 70);

            double diff;
            double.TryParse(tokens.Skip(1).FirstOrDefault(), out diff);
            return new FrameInfo
            {
                NumFrames = numFrames,
                TimeDiff = diff,
            };
        }
    }
}