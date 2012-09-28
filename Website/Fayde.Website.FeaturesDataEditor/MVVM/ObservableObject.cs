using System.ComponentModel;

namespace Fayde.Website.FeaturesDataEditor.MVVM
{
    public class ObservableObject : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {
            var obj = PropertyChanged;
            if (obj != null)
                obj(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}