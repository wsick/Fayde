using System.Windows;
using System.Windows.Controls;
using Fayde.Website.FeaturesDataEditor.ViewModels;

namespace Fayde.Website.FeaturesDataEditor
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = MainViewModel.Instance;
        }

        private void Deselect_Click(object sender, RoutedEventArgs e)
        {
            var tvi = FeaturesTreeView.ItemContainerGenerator.ContainerFromItem(FeaturesTreeView.SelectedItem) as TreeViewItem;
            if (tvi == null)
                return;
            tvi.IsSelected = false;
        }
    }
}