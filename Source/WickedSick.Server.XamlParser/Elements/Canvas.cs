using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class Canvas
    {
        public static readonly AttachedPropertyDescription ZIndex = AttachedPropertyDescription.Register("ZIndex", typeof(int), typeof(Canvas));
    }
}
