using System;
using System.Collections.ObjectModel;
using Fayde.Website.FeaturesDataEditor.IO;
using Fayde.Website.FeaturesDataEditor.Models;
using Fayde.Website.FeaturesDataEditor.MVVM;
using System.Linq;
using Microsoft.Win32;

namespace Fayde.Website.FeaturesDataEditor.ViewModels
{
    public class MainViewModel : ObservableObject
    {
        private static Lazy<MainViewModel> _InstanceLazy = new Lazy<MainViewModel>(() => new MainViewModel());
        public static MainViewModel Instance { get { return _InstanceLazy.Value; } }

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

        private Feature _SelectedFeature;
        public Feature SelectedFeature
        {
            get { return _SelectedFeature; }
            set
            {
                _SelectedFeature = value;
                OnPropertyChanged("SelectedFeature");
            }
        }

        #endregion

        #region AddFeatureCommand

        private RelayCommand _AddFeatureCommand;
        public RelayCommand AddFeatureCommand
        {
            get
            {
                if (_AddFeatureCommand == null)
                    _AddFeatureCommand = new RelayCommand(AddFeature_Execute);
                return _AddFeatureCommand;
            }
        }

        private void AddFeature_Execute()
        {
            var list = SelectedFeature == null ? Features : SelectedFeature.Features;
            var newFeature = new Feature { Name = "New Feature", SupportLevel = SupportLevels.None };
            list.Add(newFeature);
            SelectedFeature = newFeature;
        }

        #endregion

        #region DeleteFeatureCommand

        private RelayCommand _DeleteFeatureCommand;
        public RelayCommand DeleteFeatureCommand
        {
            get
            {
                if (_DeleteFeatureCommand == null)
                    _DeleteFeatureCommand = new RelayCommand(DeleteFeature_Execute);
                return _DeleteFeatureCommand;
            }
        }

        private void DeleteFeature_Execute()
        {
            if (SelectedFeature == null)
                return;

            var parent = GetParentFeature(null, SelectedFeature);
            if (parent == null)
                Features.Remove(SelectedFeature);
            else
                parent.Features.Remove(SelectedFeature);
            
            SelectedFeature = null;
        }

        private Feature GetParentFeature(Feature curFeature, Feature feature)
        {
            var source = curFeature == null ? Features : curFeature.Features;
            if (source.Any(f => f == feature))
                return curFeature;
            return source
                .Select(f => GetParentFeature(f, feature))
                .FirstOrDefault(f => f != null);
        }

        #endregion

        #region OpenCommand

        private RelayCommand _OpenCommand;
        public RelayCommand OpenCommand
        {
            get
            {
                if (_OpenCommand == null)
                    _OpenCommand = new RelayCommand(Open_Execute);
                return _OpenCommand;
            }
        }

        private void Open_Execute()
        {
            var dialog = new OpenFileDialog { Filter = "XML Files (*.xml)|*.xml", };
            if (dialog.ShowDialog() != true)
                return;
            Features = FeaturesXmlLoader.Load(dialog.FileName).ToObservable();
        }

        #endregion

        #region SaveAsCommand
        
        private RelayCommand _SaveAsCommand;
        public RelayCommand SaveAsCommand
        {
            get
            {
                if (_SaveAsCommand == null)
                    _SaveAsCommand = new RelayCommand(SaveAs_Execute);
                return _SaveAsCommand;
            }
        }

        private void SaveAs_Execute()
        {
            var dialog = new SaveFileDialog { Filter = "XML Files (*.xml)|*.xml", };
            dialog.OverwritePrompt = true;
            if (dialog.ShowDialog() != true)
                return;
            FeaturesXmlSaver.Save(dialog.FileName, Features);
        }

        #endregion
    }
}