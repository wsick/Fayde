using System;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public enum Stretch
    {
        Fill,
        None,
        Uniform,
        UniformToFill,
    }
}