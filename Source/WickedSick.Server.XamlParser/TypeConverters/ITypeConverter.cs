using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public interface ITypeConverter
    {
        Type ConversionType { get; }
        object Convert(string from);
    }
}
