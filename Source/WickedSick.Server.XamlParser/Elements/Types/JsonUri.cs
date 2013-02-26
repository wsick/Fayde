using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    [Element("", "Uri")]
    public class JsonUri : IJsonConvertible
    {
        private Uri _Uri;

        public JsonUri(Uri uri)
        {
            _Uri = uri;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}(\"{1}\")", ElementAttribute.GetFullNullstoneType(GetType(), outputMods),  _Uri);
        }
    }
}
