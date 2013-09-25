using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Data;

namespace WickedSick.Thea.Resources
{
    class RelativeSizeValueConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            double amount = double.Parse(values[0].ToString());
            double total = double.Parse(values[1].ToString());
            double totalSize = double.Parse(values[2].ToString());
            return (amount / total) * totalSize;
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}