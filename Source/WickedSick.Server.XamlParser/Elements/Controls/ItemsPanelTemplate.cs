
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ItemsPanelTemplate : DependencyObject
    {
        public static readonly PropertyDescription PanelProperty = PropertyDescription.Register("Panel", typeof(Panel), typeof(ItemsPanelTemplate), true);
        public Panel Panel
        {
            get { return GetValue("Panel") as Panel; }
            set { SetValue("Panel", value); }
        }

        public override string ToJson(int tabIndent)
        {
            if (Panel == null)
                return string.Format("new {0}()", ElementAttribute.GetFullNullstoneType(GetType()));
            return string.Format("new {0}({1})", ElementAttribute.GetFullNullstoneType(GetType()), Panel.ToJson(0));
        }
    }
}