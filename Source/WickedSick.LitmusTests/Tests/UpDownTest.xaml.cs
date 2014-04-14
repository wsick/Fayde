using System.Windows.Controls;

namespace WickedSick.LitmusTests.Tests
{
    public partial class UpDownTest : UserControl
    {
        public UpDownTest()
        {
            InitializeComponent();
            TestItems = new object[]
            {
                new { Name = "Florida" },
                new { Name = "Georgia" },
                new { Name = "South Carolina" },
                new { Name = "Alabama" },
                new { Name = "Tennessee" },
            };
        }

        public object[] TestItems { get; set; }
    }
}
