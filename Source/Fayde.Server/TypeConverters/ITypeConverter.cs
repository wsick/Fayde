using System;

namespace Fayde.TypeConverters
{
    public interface ITypeConverter
    {
        Type ConversionType { get; }
        object Convert(string from);
    }
}