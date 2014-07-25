using System;
using System.ComponentModel;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private string _SomeText;
        public string SomeText
        {
            get { return this._SomeText; }
            set
            {
                this._SomeText = value;
                this.PropertyChanged(this, new PropertyChangedEventArgs("SomeText"));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}