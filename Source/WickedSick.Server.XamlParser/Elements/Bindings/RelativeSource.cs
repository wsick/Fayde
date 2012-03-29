using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    /// <summary>
    /// Only two modes are supported right now (Self, TemplatedParent)
    /// Modes not supported are PreviousData and FindAncestor
    /// </summary>
    public enum RelativeSourceMode
    {
        Self,
        TemplatedParent
    }

    public class RelativeSource: IJsonSerializable
    {
        public RelativeSourceMode Mode { get; set; }

        public RelativeSource(RelativeSourceMode mode)
        {
            Mode = mode;
        }

        public string toJson(int tabIndents)
        {
            throw new NotImplementedException();
        }
    }
}
