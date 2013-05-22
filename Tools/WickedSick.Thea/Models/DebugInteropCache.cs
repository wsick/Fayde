using System.Collections.Generic;
using System.Runtime.Serialization;

namespace WickedSick.Thea.Models
{
    [DataContract]
    public class DebugInteropCache
    {
        [DataMember(Name = "ID")]
        public int ID { get; set; }

        [DataMember(Name = "Name")]
        public string Name { get; set; }

        [DataMember(Name = "TypeName")]
        public string TypeName { get; set; }

        [DataMember(Name = "Children")]
        public List<DebugInteropCache> Children { get; set; }
    }
}