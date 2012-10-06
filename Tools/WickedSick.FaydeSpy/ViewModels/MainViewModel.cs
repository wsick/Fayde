using System.Collections.ObjectModel;
using Awesomium.Core;
using WickedSick.FaydeSpy.Interop;
using WickedSick.MVVM;

namespace WickedSick.FaydeSpy.ViewModels
{
    public class MainViewModel : ViewModelBase, ILoadable
    {
        protected FaydeInterop _Interop;

        private ObservableCollection<VisualViewModel> _RootLayers = new ObservableCollection<VisualViewModel>();
        public ObservableCollection<VisualViewModel> RootLayers
        {
            get { return _RootLayers; }
            set
            {
                _RootLayers = value;
                OnPropertyChanged("RootLayers");
            }
        }

        public void Load(object parameter)
        {
            if (!(parameter is IWebViewJavaScript))
                return;
            _Interop = new FaydeInterop(parameter as IWebViewJavaScript);
            RootLayers.Clear();
            foreach (var v in _Interop.GetVisualTree())
            {
                RootLayers.Add(v);
            }
        }
    }
}
