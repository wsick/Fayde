using System.Collections.Generic;
using System.Linq;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    [Element(NullstoneNamespace = "Fayde")]
    public class TextDecorationCollection : IJsonConvertible
    {
        private List<string> _Items = new List<string>();

        public TextDecorationCollection()
        {
        }

        public TextDecorationCollection(IEnumerable<string> items)
        {
            _Items.AddRange(items);
        }

        public void AddItem(string item)
        {
            _Items.Add(item);
        }

        public string ToJson(int tabIndents)
        {
            //TextDecorations are a flags enum in javascript, bitwise OR all items
            return string.Join(" | ", _Items.Select(i => string.Format("Fayde.TextDecorations.{0}", i)));
        }
    }
}