using System.Windows;
using System.Windows.Controls;

namespace WickedSick.Thea.Views
{
    public partial class LoadWindow : Window
    {
        public LoadWindow()
        {
            InitializeComponent();
        }

        private void ListBox_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if ((sender as ListBox).SelectedItem != null)
                DialogResult = true;
        }
    }
}