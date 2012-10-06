using System.Windows;
using Awesomium.Core;

namespace WickedSick.FaydeSpy
{
    public partial class App : Application
    {
        public App()
        {
            var config = new WebCoreConfig { AutoUpdatePeriod = 10, };
            WebCore.Initialize(config);
        }
    }
}