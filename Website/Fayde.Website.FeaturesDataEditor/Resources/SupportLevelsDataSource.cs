using System;
using System.Collections.Generic;
using System.Linq;
using Fayde.Website.Models;

namespace Fayde.Website.FeaturesDataEditor.Resources
{
    public class SupportLevelsDataSource : IEnumerable<SupportLevels>
    {
        private static List<SupportLevels> _Levels;

        static SupportLevelsDataSource()
        {
            _Levels = Enum.GetValues(typeof(SupportLevels))
                .OfType<SupportLevels>()
                .ToList();
        }

        public IEnumerator<SupportLevels> GetEnumerator()
        {
            return _Levels.GetEnumerator();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _Levels.GetEnumerator();
        }
    }
}