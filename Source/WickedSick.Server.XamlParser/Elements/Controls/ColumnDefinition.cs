using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ColumnDefinition : DependencyObject
    {
        public static readonly PropertyDescription Width = PropertyDescription.Register("Width", typeof(GridLength), typeof(ColumnDefinition));
    }
}
