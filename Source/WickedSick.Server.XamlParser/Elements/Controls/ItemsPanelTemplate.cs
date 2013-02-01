
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
                return "new ItemsPanelTemplate()";
            return string.Format("new ItemsPanelTemplate({0})", Panel.ToJson(0));
        }
    }
}