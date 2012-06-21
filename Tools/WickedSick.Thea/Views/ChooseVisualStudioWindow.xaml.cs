using System.Windows;
using System.Windows.Controls;

namespace WickedSick.Thea.Views
{
    public partial class ChooseVisualStudioWindow : Window
    {
        public ChooseVisualStudioWindow()
        {
            InitializeComponent();
        }

        private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if ((sender as ListBox).SelectedItem != null)
                DialogResult = true;
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
        }
    }
}