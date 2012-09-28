using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Fayde.Website.Models;

namespace Fayde.Website.IO
{
    public class FeaturesXmlLoader
    {
        public static IEnumerable<Feature> Load(string filepath)
        {
            var xd = XDocument.Load(filepath);
            return ReadFeaturesElement(xd.Root);
        }

        private static IEnumerable<Feature> ReadFeaturesElement(XElement xe)
        {
            if (xe == null || xe.IsEmpty)
                return Enumerable.Empty<Feature>();
            return xe.Elements()
                .Select(ReadFeatureElement)
                .OrderBy(f => f.Type)
                .ThenBy(f => f.Name);
        }

        private static Feature ReadFeatureElement(XElement xe)
        {
            var name = string.Empty;
            var xnName = xe.Element("Name");
            if (xnName != null)
                name = xnName.Value;

            var supportLevel = SupportLevels.None;
            var xnSL = xe.Element("SupportLevel");
            if (xnSL != null)
                Enum.TryParse<SupportLevels>(xnSL.Value, out supportLevel);

            var featureType = FeatureTypes.Class;
            var xnType = xe.Element("Type");
            if (xnType != null)
                Enum.TryParse<FeatureTypes>(xnType.Value, out featureType);

            return new Feature
            {
                Name = name,
                SupportLevel = supportLevel,
                Type = featureType,
                Features = ReadFeaturesElement(xe.Element("Features")).ToObservable(),
            };
        }
    }
}