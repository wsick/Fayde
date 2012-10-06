using System;
using System.Windows;
using System.Windows.Data;

namespace WickedSick.FaydeSpy.Resources
{
    public class BoolVisibilityConverter : IValueConverter
    {
        public bool IsNegated { get; set; }

        protected Visibility TrueValue { get { return !IsNegated ? Visibility.Visible : Visibility.Collapsed; } }
        protected Visibility FalseValue { get { return !IsNegated ? Visibility.Collapsed : Visibility.Visible; } }

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            if (value is bool)
                return (bool)value ? TrueValue : FalseValue;
            if (value is bool?)
                return (bool?)value == true ? TrueValue : FalseValue;
            return Visibility.Visible;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}