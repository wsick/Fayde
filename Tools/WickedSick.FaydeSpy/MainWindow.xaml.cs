using System.Windows;
using Awesomium.Core;

namespace WickedSick.FaydeSpy
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void WebControl_Loaded(object sender, RoutedEventArgs e)
        {
            var loadable = DataContext as ILoadable;
            if (loadable != null)
                loadable.Load(WebControl as IWebViewJavaScript);
        }
    }
}