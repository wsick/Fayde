using Fayde.Core;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ItemsPanelTemplate : DependencyObject
    {
        public static readonly PropertyDescription PanelProperty = PropertyDescription.Register("Panel", typeof(Panel), typeof(ItemsPanelTemplate), true);
        public Panel Panel
        {
            get { return GetValue("Panel") as Panel; }
            set { SetValue("Panel", value); }
        }

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            var typeName = GetTypeName(outputMods);
            if (Panel == null)
                return string.Format("new {0}()", typeName);
            return string.Format("new {0}({1})", typeName, Panel.ToJson(0, outputMods));
        }
    }
}