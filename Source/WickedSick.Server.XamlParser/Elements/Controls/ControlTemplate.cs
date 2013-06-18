using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ControlTemplate : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(ControlTemplate), true);
        public UIElement Content
        {
            get { return this.GetValue("Content") as UIElement; }
            set { this.SetValue("Content", value); }
        }

        public static readonly PropertyDescription TargetTypeProperty = PropertyDescription.Register("TargetType", typeof(JsType), typeof(ControlTemplate));
        public JsType TargetType
        {
            get { return this.GetValue("TargetType") as JsType; }
            set { this.SetValue("TargetType", value); }
        }

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            var content = this.Content;
            if (content == null)
                throw new XamlParseException("No UIElement Content was specified for ControlTemplate.");

            var targetType = this.TargetType;
            if (targetType == null)
                throw new XamlParseException("TargetType must be specified in ControlTemplate.");

            return string.Format("new {0}({1}, {2})", GetTypeName(outputMods), targetType.ToJson(0, outputMods), content.ToJson(tabIndent, outputMods));
        }
    }
}