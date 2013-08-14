using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fayde.Xaml.Metadata;

namespace Fayde.Xaml
{
    public class JsonOutputModifiers : IJsonOutputModifiers
    {
        public JsonOutputModifiers()
        {
            TypeReferences = new List<Type>();
            IsNamespaceIncluded = true;
        }

        public List<Type> TypeReferences { get; set; }

        public bool IsNamespaceIncluded { get; set; }
        public void AddTypeReference(Type type)
        {
            TypeReferences.Add(type);
        }

        public string SerializeLocalDeclarations()
        {
            var sb = new StringBuilder();
            TypeReferences
                .Select(ElementAttribute.CreateNullstoneTypeDeclaration)
                .Where(s => s != null)
                .Distinct()
                .Select(sb.AppendLine)
                .ToList();
            return sb.ToString();
        }
    }
}