using System;
using System.Runtime.InteropServices;
using System.Windows;
using WickedSick.Thea.ViewModels;

namespace WickedSick.Thea
{
    public partial class App : Application
    {
        public void Initialize()
        {
            App.Current.DispatcherUnhandledException += Current_DispatcherUnhandledException;
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

        private void Current_DispatcherUnhandledException(object sender, System.Windows.Threading.DispatcherUnhandledExceptionEventArgs e)
        {
            if (e.Exception is COMException)
            {
                e.Handled = true;
                var vm = App.Current.MainWindow.DataContext as MainViewModel;
                vm.Load();
            }
        }

        public void CleanUp(object dataContext)
        {
            (dataContext as MainViewModel).Dispose();
        }
    }
}