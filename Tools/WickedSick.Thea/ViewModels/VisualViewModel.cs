using System.Collections.ObjectModel;
using WickedSick.MVVM;
using System.Collections.Generic;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.ViewModels
{
    public class VisualViewModel : ViewModelBase
    {
        #region Properties

        public string IndexPath { get; set; }
        public string ID { get; set; }

        private string _Type;
        public string Type
        {
            get { return _Type; }
            set
            {
                _Type = value;
                OnPropertyChanged("Type");
            }
        }

        private string _Name;
        public string Name
        {
            get { return _Name; }
            set
            {
                _Name = value;
                OnPropertyChanged("Name");
            }
        }

        private ObservableCollection<VisualViewModel> _VisualChildren = new ObservableCollection<VisualViewModel>();
        public ObservableCollection<VisualViewModel> VisualChildren
        {
            get { return _VisualChildren; }
            set
            {
                _VisualChildren = value;
                OnPropertyChanged("VisualChildren");
            }
        }

        private ObservableCollection<DependencyValue> _Properties = new ObservableCollection<DependencyValue>();
        public ObservableCollection<DependencyValue> Properties
        {
            get { return _Properties; }
            set
            {
                _Properties = value;
                OnPropertyChanged("Properties");
            }
        }

        #endregion
    }
}