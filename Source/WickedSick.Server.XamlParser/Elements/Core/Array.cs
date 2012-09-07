
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Array : DependencyObjectCollection<object>
    {
        public static readonly PropertyDescription ElementsProperty = PropertyDescription.Register("Elements", typeof(DependencyObjectCollection<object>), typeof(Array), true);
    }
}