using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Fayde.Website.FeaturesDataEditor.Models;

namespace Fayde.Website.FeaturesDataEditor.IO
{
    public class FeaturesXmlSaver
    {
        public static void Save(string filepath, IEnumerable<Feature> features)
        {
            var xd = new XDocument();
            xd.Add(new XElement("Features", features.Select(CreateFeatureElement)));
            xd.Save(filepath);
        }

        private static XElement CreateFeatureElement(Feature feature)
        {
            return new XElement("Feature",
                new XElement("Name", feature.Name),
                new XElement("SupportLevel", feature.SupportLevel.ToString()),
                new XElement("Type", feature.Type.ToString()),
                new XElement("Features", feature.Features.Select(CreateFeatureElement)));
        }
    }
}