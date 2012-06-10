using System;
using System.Linq;
using WatiN.Core;
using WickedSick.MVVM;
using WickedSick.MVVM.DialogEx;
using WickedSick.Thea.Helpers;
using System.Collections.ObjectModel;

namespace WickedSick.Thea.ViewModels
{
    public class MainViewModel : ViewModelBase, IDisposable
    {
        private FaydeInterop _Interop;

        public MainViewModel()
        {
        }

        #region Properties

        private Browser _AttachedBrowser;
        public Browser AttachedBrowser
        {
            get { return _AttachedBrowser; }
            set
            {
                _AttachedBrowser = value;
                OnPropertyChanged("AttachedBrowser");
            }
        }

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

        private VisualViewModel _SelectedVisual;
        public VisualViewModel SelectedVisual
        {
            get { return _SelectedVisual; }
            set
            {
                _SelectedVisual = value;
                OnPropertyChanged("SelectedVisual");
            }
        }

        #endregion

        #region Load

        private DialogViewModel<LoadViewModel> _LoadCommand;
        public DialogViewModel<LoadViewModel> LoadCommand
        {
            get
            {
                if (_LoadCommand == null)
                    _LoadCommand = CreateLoadCommand();
                return _LoadCommand;
            }
        }

        private DialogViewModel<LoadViewModel> CreateLoadCommand()
        {
            return new DialogViewModel<LoadViewModel>
            {
                ViewModelBuilder = o => new LoadViewModel(),
                AcceptAction = lvm => InitializeAttachedBrowser(lvm.SelectedBrowser),
                CompleteAction = o =>
                {
                    var lvm = (LoadViewModel)o.Data;
                    lvm.Dispose();
                    if (o.Result != true)
                        App.Current.Shutdown();
                },
            };
        }

        #endregion

        public void Load()
        {
            LoadCommand.RequestChangeCommand.Execute(null);
        }

        private void InitializeAttachedBrowser(Browser browser)
        {
            AttachedBrowser = browser;
            _Interop = new FaydeInterop(AttachedBrowser);
            foreach (var v in _Interop.GetVisualTree())
            {
                RootLayers.Add(v);
            }
            //_Interop.PopulateProperties(RootLayers[0]);
        }

        public void Dispose()
        {
            if (AttachedBrowser != null)
            {
                AttachedBrowser.Dispose();
                AttachedBrowser = null;
            }
        }

        protected override void OnPropertyChanged(string propertyName)
        {
            base.OnPropertyChanged(propertyName);
            if (propertyName == "SelectedVisual")
            {
                _Interop.PopulateProperties(SelectedVisual);
            }
        }
    }
}