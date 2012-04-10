using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class JsonUri : IJsonSerializable
    {
        private Uri _Uri;

        public JsonUri(Uri uri)
        {
            _Uri = uri;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("new Uri(\"{0}\")", _Uri);
        }
    }
}
