using System.Collections.ObjectModel;
using Fayde.Website.FeaturesDataEditor.MVVM;

namespace Fayde.Website.FeaturesDataEditor.Models
{
    public class Feature : ObservableObject
    {
        #region Properties

        private ObservableCollection<Feature> _Features = new ObservableCollection<Feature>();
        public ObservableCollection<Feature> Features
        {
            get { return _Features; }
            set
            {
                _Features = value;
                OnPropertyChanged("Features");
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

        private SupportLevels _SupportLevel;
        public SupportLevels SupportLevel
        {
            get { return _SupportLevel; }
            set
            {
                _SupportLevel = value;
                OnPropertyChanged("SupportLevel");
            }
        }

        private FeatureTypes _Type;
        public FeatureTypes Type
        {
            get { return _Type; }
            set
            {
                _Type = value;
                OnPropertyChanged("Type");
            }
        }

        #endregion
    }
}