using System.Windows;
using WickedSick.Thea.Views;

namespace WickedSick.Thea
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Closed += (s, e) => OnClosed();
            (App.Current as App).Initialize();
        }

        private void OnClosed()
        {
            (App.Current as App).CleanUp(DataContext);
        }
    }
}