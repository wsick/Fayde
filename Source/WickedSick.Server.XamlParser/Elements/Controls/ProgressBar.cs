using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Controls.Primitives;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ProgressBar : RangeBase
    {
        public static readonly PropertyDescription IsIndeterminateProperty = PropertyDescription.Register("IsIndeterminate", typeof(bool), typeof(ProgressBar));
    }
}