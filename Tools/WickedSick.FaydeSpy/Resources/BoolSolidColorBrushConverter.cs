using System;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;

namespace WickedSick.FaydeSpy.Resources
{
    public class BoolSolidColorBrushConverter : IValueConverter
    {
        public Color Color { get; set; }

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            if (value is bool && (bool)value)
                return new SolidColorBrush(Color);
            return DependencyProperty.UnsetValue;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}