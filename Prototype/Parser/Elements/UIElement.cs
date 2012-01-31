using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public abstract class UIElement: IJsonSerializable
    {
        private IList<AttachedProperty> _attachedProperties = new List<AttachedProperty>();
        public IList<AttachedProperty> AttachedProperties
        {
            get { return _attachedProperties; }
        }
        public abstract string toJson(int tabIndents);
    }
}
