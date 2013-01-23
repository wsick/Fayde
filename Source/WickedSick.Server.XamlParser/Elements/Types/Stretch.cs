using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public enum Stretch
    {
        Fill,
        None,
        Uniform,
        UniformToFill,
    }
}