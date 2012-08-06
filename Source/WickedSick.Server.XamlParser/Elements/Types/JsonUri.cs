using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class JsonUri : IJsonConvertible
    {
        private Uri _Uri;

        public JsonUri(Uri uri)
        {
            _Uri = uri;
        }

        public string ToJson(int tabIndents)
        {
            return string.Format("new Uri(\"{0}\")", _Uri);
        }
    }
}
