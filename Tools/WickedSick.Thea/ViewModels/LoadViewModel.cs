using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Threading;
using WatiN.Core;
using WickedSick.MVVM;

namespace WickedSick.Thea.ViewModels
{
    public class LoadViewModel : ViewModelBase, IDisposable
    {
        private Dispatcher _Dispatcher;

        public LoadViewModel()
        {
            _Dispatcher = Dispatcher.CurrentDispatcher;
            RefreshCommand.Execute();
        }

        #region Properties

        private ObservableCollection<Browser> _Browsers = new ObservableCollection<Browser>();
        public ObservableCollection<Browser> Browsers
        {
            get { return _Browsers; }
            set
            {
                _Browsers = value;
                OnPropertyChanged("Browsers");
            }
        }

        private Browser _SelectedBrowser;
        public Browser SelectedBrowser
        {
            get { return _SelectedBrowser; }
            set
            {
                _SelectedBrowser = value;
                OnPropertyChanged("SelectedBrowser");
            }
        }

        private bool _IsBusy;
        public bool IsBusy
        {
            get { return _IsBusy; }
            set
            {
                _IsBusy = value;
                OnPropertyChanged("IsBusy");
            }
        }

        #endregion

        #region Refresh

        private RelayCommand _RefreshCommand;
        public RelayCommand RefreshCommand
        {
            get
            {
                if (_RefreshCommand == null)
                    _RefreshCommand = new RelayCommand(Refresh_Execute, Refresh_CanExecute);
                return _RefreshCommand;
            }
        }

        private void Refresh_Execute()
        {
            IsBusy = true;
            Dispatcher.CurrentDispatcher.BeginInvoke((Action)DoRefresh, new object[] { });
        }

        private bool Refresh_CanExecute()
        {
            return !IsBusy;
        }

        private void DoRefresh()
        {
            var browsers = new List<Browser>();
            Exception error = null;
            try
            {
                browsers.AddRange(IE.InternetExplorers());
            }
            catch (Exception ex)
            {
                error = ex;
            }
            ContinueRefresh(error, browsers);
        }

        private void ContinueRefresh(Exception error, List<Browser> browsers)
        {
            _Dispatcher.BeginInvoke((Action<List<Browser>>)FinishRefresh, new object[] { browsers });
        }

        private void FinishRefresh(List<Browser> browsers)
        {
            Browsers.Clear();
            foreach (var ie in browsers.OfType<IE>())
            {
                ie.AutoClose = false;
            }
            foreach (var ie in browsers)
            {
                Browsers.Add(ie);
            }
            IsBusy = false;
        }

        #endregion

        public void Dispose()
        {
            foreach (var b in Browsers.Where(b => b != SelectedBrowser))
            {
                b.Dispose();
            }
            Browsers.Clear();
            SelectedBrowser = null;
        }

        protected override void OnPropertyChanged(string propertyName)
        {
            base.OnPropertyChanged(propertyName);
            if (propertyName == "IsBusy")
                RefreshCommand.ForceCanExecuteChanged();
        }
    }
}