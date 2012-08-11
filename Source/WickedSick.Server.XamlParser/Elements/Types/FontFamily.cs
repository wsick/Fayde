
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class FontFamily : DependencyObject
    {
        public static readonly PropertyDescription FamilyNamesProperty = PropertyDescription.Register("FamilyNames", typeof(string), typeof(FontFamily), true);
        public string FamilyNames
        {
            get { return GetValue("FamilyNames") as string; }
            set { SetValue("FamilyNames", value); }
        }

        public override string ToJson(int tabIndent)
        {
            return string.Format("new FontFamily(\"{0}\")", FamilyNames);
        }
    }
}