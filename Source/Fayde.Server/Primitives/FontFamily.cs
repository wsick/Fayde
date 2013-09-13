using Fayde.Core;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Primitives
{
    [Element("")]
    public class FontFamily : DependencyObject
    {
        public static readonly PropertyDescription FamilyNamesProperty = PropertyDescription.Register("FamilyNames", typeof(string), typeof(FontFamily), true);
        public string FamilyNames
        {
            get { return GetValue("FamilyNames") as string; }
            set { SetValue("FamilyNames", value); }
        }
    }
}