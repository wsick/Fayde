using System.Runtime.Serialization;

namespace WickedSick.Thea.Models
{
    [DataContract]
    public class DependencyPropertyCache
    {
        [DataMember(Name = "ID")]
        public string ID { get; set; }

        [DataMember(Name = "Name")]
        public string Name { get; set; }

        [DataMember(Name = "OwnerTypeName")]
        public string OwnerTypeName { get; set; }

        [DataMember(Name = "TargetTypeName")]
        public string TargetTypeName { get; set; }

        [DataMember(Name = "IsReadOnly")]
        public bool IsReadOnly { get; set; }

        [DataMember(Name = "IsAttached")]
        public bool IsAttached { get; set; }
    }
}