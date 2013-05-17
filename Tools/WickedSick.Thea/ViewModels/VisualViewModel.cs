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

        public string IndexPath { get; set; }
        public string ID { get; set; }

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

        public IEnumerable<VisualViewModel> AllChildren
        {
            get
            {
                if (!VisualChildren.Any())
                    return Enumerable.Empty<VisualViewModel>();
                return VisualChildren.Concat(VisualChildren.SelectMany(vc => vc.AllChildren));
            }
        }

        public string ResolveVisualWithJavascript()
        {
            return string.Format("App.Current.DebugInterop._Cache{0}.Visual", IndexPath);
        }
    }
}