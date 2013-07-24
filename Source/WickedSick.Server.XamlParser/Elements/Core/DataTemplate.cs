
namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public class DataTemplate : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(DataTemplate), true);
        public static readonly PropertyDescription DataTypeProperty = PropertyDescription.Register("DataType", typeof(object), typeof(DataTemplate));

        public UIElement Content
        {
            get { return this.GetValue("Content") as UIElement; }
            set { this.SetValue("Content", value); }
        }

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            var content = this.Content;
            if (content == null)
                throw new XamlParseException("No UIElement Content was specified for DataTemplate.");

            return string.Format("new {0}({1})", GetTypeName(outputMods), content.ToJson(tabIndent, outputMods));
        }
    }
}