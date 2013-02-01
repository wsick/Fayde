using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.Elements.Media
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