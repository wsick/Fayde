using System;
using System.Windows;
using WickedSick.Thea.ViewModels;

namespace WickedSick.Thea
{
    public partial class App : Application
    {
        public void Initialize()
        {
            try
            {
                var vm = new MainViewModel();
                App.Current.MainWindow.DataContext = vm;
                vm.Load();
            }
            catch (Exception)
            {
                //logger.Error("Failed to load Update Manager", ex);
                //MessageBox.Show("Update Manager failed to load properly: " + ex.Message, "Failed to load", MessageBoxButton.OK, MessageBoxImage.Error);
                App.Current.Shutdown();
            }
        }

        public void CleanUp(object dataContext)
        {
            (dataContext as MainViewModel).Dispose();
        }
    }
}