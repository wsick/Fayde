using System;

namespace Fayde.Xaml
{
    public class XamlParseException: Exception
    {
        public XamlParseException(string message)
            : base(message)
        {
        }
    }
}