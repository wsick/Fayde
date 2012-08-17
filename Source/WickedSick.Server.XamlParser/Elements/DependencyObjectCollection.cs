using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class DependencyObjectCollection<T> : DependencyObject, IEnumerable<T>, IElementTypeable
    {
        private IList<T> _items = new List<T>();

        public Type ElementType
        {
            get { return typeof(T); }
        }

        public override void AddContent(object value)
        {
            if (value is IEnumerable<T>)
            {
                foreach (var val in (value as IEnumerable<T>))
                {
                    _items.Add(val);
                }
            }
            else
            {
                _items.Add((T)value);
            }
        }

        public override string ToJson(int tabIndents)
        {
            if (_items.Count == 0)
                return "[]";

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

        public IEnumerator<T> GetEnumerator()
        {
            return _items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _items.GetEnumerator();
        }
    }
}