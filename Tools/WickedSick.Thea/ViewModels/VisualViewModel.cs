using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using WickedSick.MVVM;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.ViewModels
{
    public class VisualViewModel : ViewModelBase
    {
        #region Properties

        public int ID { get; set; }

        private bool _IsThisOnStackFrame;
        public bool IsThisOnStackFrame
        {
            get { return _IsThisOnStackFrame; }
            set
            {
                _IsThisOnStackFrame = value;
                OnPropertyChanged("IsThisOnStackFrame");
            }
        }

        private bool _IsInHitTest;
        public bool IsInHitTest
        {
            get { return _IsInHitTest; }
            set
            {
                _IsInHitTest = value;
                OnPropertyChanged("IsInHitTest");
            }
        }

        private string _TypeName;
        public string TypeName
        {
            get { return _TypeName; }
            set
            {
                _TypeName = value;
                OnPropertyChanged("TypeName");
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

        private ObservableCollection<PropertyStorageWrapper> _PropertyStorages;
        public ObservableCollection<PropertyStorageWrapper> PropertyStorages
        {
            get { return _PropertyStorages; }
            set
            {
                _PropertyStorages = value;
                OnPropertyChanged("PropertyStorages");
            }
        }

        private LayoutMetrics _LayoutMetrics;
        public LayoutMetrics LayoutMetrics
        {
            get { return _LayoutMetrics; }
            set
            {
                _LayoutMetrics = value;
                OnPropertyChanged("LayoutMetrics");
            }
        }

        #endregion

        public IEnumerable<VisualViewModel> AllChildren
        {
            get
            {
                if (!VisualChildren.Any())
                    return Enumerable.Empty<VisualViewModel>();
                return VisualChildren.Concat(VisualChildren.SelectMany(vc => vc.AllChildren));
            }
        }
    }
}