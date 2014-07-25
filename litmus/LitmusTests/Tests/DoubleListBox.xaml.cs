using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace LitmusTests.Tests
{
    public partial class DoubleListBox : UserControl
    {
        public ObservableCollection<TestClass> AllItems { get; set; }

        public DoubleListBox()
        {
            InitializeComponent();
            AllItems = new ObservableCollection<TestClass>(Enumerable.Range(0, 5)
                .Select(i => new TestClass
                {
                    SubItems = new ObservableCollection<int>(Enumerable.Range(1, 5))
                }));
            DataContext = this;
        }

        private void Add_Click(object sender, RoutedEventArgs e)
        {
            var i = AllItems.FirstOrDefault();
            if (i == null)
                AllItems.Add(i = new TestClass());
            i.SubItems.Add(i.SubItems.Count);
        }

        private void Remove_Click(object sender, RoutedEventArgs e)
        {
            var i = AllItems.FirstOrDefault();
            if (i == null)
                return;
            i.SubItems.RemoveAt(0);
            if (!i.SubItems.Any())
                AllItems.RemoveAt(0);
        }

        public class TestClass
        {
            public ObservableCollection<int> SubItems { get; set; }
        }
    }
}