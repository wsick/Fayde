using System;
using System.Collections.Generic;
using System.Linq;
using Fayde.Website.FeaturesDataEditor.Models;

namespace Fayde.Website.FeaturesDataEditor.Resources
{
    public class FeatureTypesDataSource : IEnumerable<FeatureTypes>
    {
        private static List<FeatureTypes> _Types;

        static FeatureTypesDataSource()
        {
            _Types = Enum.GetValues(typeof(FeatureTypes))
                .OfType<FeatureTypes>()
                .ToList();
        }

        public IEnumerator<FeatureTypes> GetEnumerator()
        {
            return _Types.GetEnumerator();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _Types.GetEnumerator();
        }
    }
}