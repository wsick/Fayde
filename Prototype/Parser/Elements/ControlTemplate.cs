
namespace Parser.Elements
{
    [Element]
    public class ControlTemplate : IJsonSerializable
    {
        [Property]
        public string TargetType { get; set; }

        [Content]
        public UIElement Content { get; set; }

        public string toJson(int tabIndents)
        {
            return string.Format("new ControlTemplate({0}, {1})", TargetType, Content.toJson(tabIndents));
        }
    }
}
