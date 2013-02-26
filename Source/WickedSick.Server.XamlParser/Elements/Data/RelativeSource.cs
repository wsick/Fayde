using System;

namespace WickedSick.Server.XamlParser.Elements.Data
{
    /// <summary>
    /// Only two modes are supported right now (Self, TemplatedParent)
    /// Modes not supported are PreviousData and FindAncestor
    /// </summary>
    [Element("Fayde.Data")]
    public enum RelativeSourceMode
    {
        Self,
        TemplatedParent
    }

    [Element("Fayde", "RelativeSourceMarkup")]
    public class RelativeSource : IJsonConvertible
    {
        public RelativeSourceMode Mode { get; set; }

        public RelativeSource(RelativeSourceMode mode)
        {
            Mode = mode;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            throw new NotImplementedException();
        }
    }
}