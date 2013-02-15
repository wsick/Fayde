using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element(NullstoneNamespace = "Fayde.Shapes")]
    public class PointCollection : DependencyObject, IEnumerable<Point>, IElementTypeable
    {
        private IList<Point> _items = new List<Point>();

        public Type ElementType
        {
            get { return typeof(Point); }
        }

        public override void AddContent(object value)
        {
            if (value is IEnumerable<Point>)
            {
                foreach (var val in (value as IEnumerable<Point>))
                {
                    _items.Add(val);
                }
            }
            else
            {
                _items.Add((Point)value);
            }
        }

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            if (_items.Count == 0)
                return "[]";

            var sb = new StringBuilder();
            sb.AppendLine("[");
            bool needsComma = false;
            foreach (object o in _items)
            {
                if (needsComma) sb.AppendLine(",");
                if (o is IJsonConvertible)
                    sb.Append(((IJsonConvertible)o).ToJson(tabIndents, outputMods));
                else
                    sb.Append(o.ToString());
                needsComma = true;
            }
            sb.AppendLine("]");
            return sb.ToString();
        }

        public IEnumerator<Point> GetEnumerator()
        {
            return _items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _items.GetEnumerator();
        }
    }
}