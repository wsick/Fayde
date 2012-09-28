using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Fayde.Website
{
    public static class IEnumerableEx
    {
        public static ObservableCollection<T> ToObservable<T>(this IEnumerable<T> enumerable)
        {
            return new ObservableCollection<T>(enumerable);
        }
    }
}