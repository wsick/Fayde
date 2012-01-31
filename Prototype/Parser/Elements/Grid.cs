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
    }
}
