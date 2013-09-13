using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    public class String : DependencyObject
    {
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(string), typeof(String), true);

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            return string.Format("\"{0}\"", GetValue("Value"));
        }
    }
}