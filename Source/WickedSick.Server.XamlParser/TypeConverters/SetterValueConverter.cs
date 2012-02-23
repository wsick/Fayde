using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class SetterValueConverter: TypeConverterAttribute
    {
        /// <summary>
        /// There are two scenarios where this can be used: Property or Value on the Setter object
        /// If setting the Value property, the Property property must be set to evaluate
        /// If setting the Property property, check the Value property to see if it needs to be converted
        /// This is done because we don't know which one will be set first
        /// </summary>
        /// <param name="element">The Dependency Object on which the value will be set.</param>
        /// <param name="pi">The Property that will be set on the Dependency Object.</param>
        /// <param name="from">The string value to be converted.</param>
        /// <returns>An object representing the converted value.</returns>
        public override object Convert(DependencyObject element, PropertyInfo pi, string from)
        {

            Setter s = (Setter)element;
            TypeConverterAttribute converter = null;

            //the property in question is the Value property
            if (pi.Name.Equals("Value"))
            {
                if (s.Property != null)
                {
                    //setting the value and Property has already been set
                    converter = GetConverter(s, s.Property);
                }

                if (converter == null)
                    return from;
                else
                    return converter.Convert(null, null, (string)from);
            }
            
            //the property in question is the Property property
            if (pi.Name.Equals("Property"))
            {
                converter = GetConverter(s, from);
                if (s.Value is string && converter != null)
                {
                    s.Value = converter.Convert(null, null, (string)s.Value);
                }
                return from;
            }

            return null;
        }

        private TypeConverterAttribute GetConverter(Setter s, string property)
        {
            Style style = (Style)s.Parent;
            Type t = Parser.GetElementType(style.TargetType);
            PropertyInfo pi = Parser.FindProperty(property, t);
            TypeConverterAttribute[] atts = (TypeConverterAttribute[])pi.GetCustomAttributes(typeof(TypeConverterAttribute), false);
            if (atts.Count() == 1)
                return atts[0];
            return null;
        }
    }
}
