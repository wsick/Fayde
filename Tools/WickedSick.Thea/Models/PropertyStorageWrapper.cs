using System;
using System.Linq;
using System.Runtime.Serialization;

namespace WickedSick.Thea.Models
{
    public enum PropertyPrecedence
    {
        IsEnabled = 0,
        LocalValue = 1,
        LocalStyle = 2,
        ImplicitStyle = 3,
        Inherited = 4,
        InheritedDataContext = 5,
        DefaultValue = 6,
    }

    public class PropertyStorageWrapper : MVVM.ObservableObject
    {
        public dynamic DynamicObject { get; set; }

        private DependencyPropertyCache _DependencyProperty;
        public DependencyPropertyCache DependencyProperty
        {
            get { return _DependencyProperty; }
            set
            {
                _DependencyProperty = value;
                OnPropertyChanged("DependencyProperty");
            }
        }

        public PropertyPrecedence EffectivePrecedence
        {
            get
            {
                int precedence = DynamicObject.Precedence;
                return Enum.GetValues(typeof(PropertyPrecedence))
                    .OfType<PropertyPrecedence>()
                    .FirstOrDefault(pp => (int)pp == precedence);
            }
        }

        public object EffectiveValue
        {
            get
            {
                var precedence = EffectivePrecedence;
                if (precedence == PropertyPrecedence.IsEnabled)
                    return DynamicObject.InheritedValue;
                if (precedence == PropertyPrecedence.LocalValue)
                    return DynamicObject.Local;
                if (precedence == PropertyPrecedence.LocalStyle)
                    return DynamicObject.LocalStyleValue;
                if (precedence == PropertyPrecedence.ImplicitStyle)
                    return DynamicObject.ImplicitStyleValue;
                if (precedence == PropertyPrecedence.Inherited)
                    return DynamicObject.InheritedValue;
                if (precedence == PropertyPrecedence.InheritedDataContext)
                    return DynamicObject.InheritedValue;
                return null;
            }
        }
    }
}