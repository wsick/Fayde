using System.Collections.ObjectModel;
using WickedSick.MVVM;
using WickedSick.Thea.VisualStudioInterop;

namespace WickedSick.Thea.ViewModels
{
    public class ChooseVisualStudioViewModel : ViewModelBase
    {
        public ChooseVisualStudioViewModel()
        {
            Instances = new ObservableCollection<VisualStudioInstance>(VisualStudioBroker.GetInstances());
        }

        #region Properties

        private ObservableCollection<VisualStudioInstance> _Instances;
        public ObservableCollection<VisualStudioInstance> Instances
        {
            get { return _Instances; }
            set
            {
                _Instances = value;
                OnPropertyChanged("Instances");
            }
        }

        private VisualStudioInstance _SelectedInstance;
        public VisualStudioInstance SelectedInstance
        {
            get { return _SelectedInstance; }
            set
            {
                _SelectedInstance = value;
                OnPropertyChanged("SelectedInstance");
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
            Instances = new ObservableCollection<VisualStudioInstance>(VisualStudioBroker.GetInstances());
        }

        #endregion
    }
}