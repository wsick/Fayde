using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class Grid: Panel
    {
        private IList<ColumnDefinition> _columnDefinitions = new List<ColumnDefinition>();
        [Property]
        public IList<ColumnDefinition> ColumnDefinitions
        {
            get { return _columnDefinitions; }
        }
        private IList<RowDefinition> _rowDefinitions = new List<RowDefinition>();
        [Property]
        public IList<RowDefinition> RowDefinitions
        {
            get { return _rowDefinitions; }
        }

        public override string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("\tType: Grid,");
            sb.AppendLine("\tProps:");
            sb.AppendLine("\t{");
            if (Background != null)
            {
                sb.Append("Background: ");
                sb.AppendLine(Background.toJson(0));
            }
            if (ColumnDefinitions.Count > 0)
            {
                sb.AppendLine("ColumnDefinitions: [");
                foreach (ColumnDefinition cd in ColumnDefinitions)
                {
                    sb.Append(cd.toJson(0));
                    sb.AppendLine(",");
                }
                sb.AppendLine("],");
            }
            if (RowDefinitions.Count > 0)
            {
                sb.AppendLine("RowDefinitions: [");
                foreach (RowDefinition rd in RowDefinitions)
                {
                    sb.Append(rd.toJson(0));
                    sb.AppendLine(",");
                }
                sb.AppendLine("],");
            }
            sb.Append(base.propsToJson());
            sb.AppendLine("\t},");
            sb.AppendLine("\tChildren: [");
            foreach (UIElement e in Children)
            {
                sb.Append(e.toJson(0));
                sb.AppendLine(",");
            }
            sb.AppendLine("\t]");
            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}
