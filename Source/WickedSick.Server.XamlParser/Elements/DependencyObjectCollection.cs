using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace WickedSick.Server.XamlParser.Elements
{
    public class DependencyObjectCollection<T>: DependencyObject
    {
        private IList<T> _items = new List<T>();

        public override void AddContent(object value)
        {
            _items.Add((T)value);
        }

        public override string ToJson(int tabIndents)
        {
            if (_items.Count == 0)
                return string.Empty;

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("[");
            bool needsComma = false;
            foreach (object o in _items)
            {
                if (needsComma) sb.AppendLine(",");
                if (o is DependencyObject)
                    sb.Append(((DependencyObject)o).ToJson(tabIndents));
                else
                    sb.Append(o.ToString());
                needsComma = true;
            }
            sb.AppendLine("]");
            return sb.ToString();
        }
    }
}
