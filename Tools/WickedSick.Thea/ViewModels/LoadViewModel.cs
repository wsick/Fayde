using System;
using System.Collections.ObjectModel;
using System.Linq;
using WatiN.Core;
using WickedSick.MVVM;

namespace WickedSick.Thea.ViewModels
{
    public class LoadViewModel : ViewModelBase, IDisposable
    {
        public LoadViewModel()
        {
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

        #endregion

        #region Refresh

        private RelayCommand _RefreshCommand;
        public RelayCommand RefreshCommand
        {
            get
            {
                if (_RefreshCommand == null)
                    _RefreshCommand = new RelayCommand(Refresh_Execute);
                return _RefreshCommand;
            }
        }

        private void Refresh_Execute()
        {
            var ies = IE.InternetExplorers().Cast<IE>().ToList();
            Browsers.Clear();
            foreach (var ie in ies)
            {
                ie.AutoClose = false;
                Browsers.Add(ie);
            }
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
    }
}