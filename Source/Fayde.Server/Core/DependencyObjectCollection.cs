using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Fayde.Xaml;

namespace Fayde.Core
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

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            if (_items.Count == 0)
                return "[]";

            var sb = new StringBuilder();
            WriteChildren(sb, tabIndents + 1, outputMods);
            return sb.ToString();
        }

        protected virtual void WriteChildren(StringBuilder sb, int tabIndents, IJsonOutputModifiers outputMods)
        {
            sb.AppendLine("[");
            bool needsComma = false;
            foreach (object o in _items)
            {
                if (needsComma) sb.AppendLine(",");
                WriteChild(o, sb, tabIndents, outputMods);
                needsComma = true;
            }
            sb.AppendLine("]");
        }

        protected virtual void WriteChild(object o, StringBuilder sb, int tabIndents, IJsonOutputModifiers outputMods)
        {
            if (o is DependencyObject)
                sb.Append(((DependencyObject)o).ToJson(tabIndents, outputMods));
            else
                sb.Append(o.ToString());
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