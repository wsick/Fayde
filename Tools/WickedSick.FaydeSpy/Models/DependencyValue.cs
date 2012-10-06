using WickedSick.MVVM;

namespace WickedSick.FaydeSpy.Models
{
    public class DependencyValue : ObservableObject
    {
        private string _OwnerTypeName;
        public string OwnerTypeName
        {
            get { return _OwnerTypeName; }
            set
            {
                _OwnerTypeName = value;
                OnPropertyChanged("OwnerTypeName");
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

        private object _Value;
        public object Value
        {
            get { return _Value; }
            set
            {
                _Value = value;
                OnPropertyChanged("Value");
            }
        }
    }
}