using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace WickedSick.Thea
{
    public static class IEnumerableEx
    {
        public static void MergeInto<T>(this IList<T> src, IList<T> dest, Func<T, T, bool> matchFunc, Func<T, IList<T>> getChildrenFunc)
        {
            if (src == null)
            {
                dest.Clear();
                return;
            }

            for (int i = 0; i < dest.Count; i++)
            {
                var existing = src.FirstOrDefault(s => matchFunc(s, dest[i]));
                if (existing != null)
                {
                    var destChildren = getChildrenFunc(dest[i]);
                    var srcChildren = getChildrenFunc(existing);
                    if (dest == null)
                        dest = srcChildren;
                    destChildren.MergeInto(srcChildren, matchFunc, getChildrenFunc);
                }
                else
                {
                    dest.RemoveAt(i);
                    i--;
                }
            }

            foreach (var newItem in src.Except(dest, matchFunc))
                dest.Add(newItem);
        }

        public static IEnumerable<T> Except<T>(this IEnumerable<T> first, IEnumerable<T> second, Func<T, T, bool> matchFunc)
        {
            var comparer = new AnonymousComparer<T> { MatchFunc = matchFunc };
            return first.Except(second, comparer);
        }

        public static IEnumerable<T> Intersect<T>(this IEnumerable<T> first, IEnumerable<T> second, Func<T, T, bool> matchFunc)
        {
            var comparer = new AnonymousComparer<T> { MatchFunc = matchFunc };
            return first.Intersect(second, comparer);
        }
    }

    public class AnonymousComparer<T> : IEqualityComparer<T>
    {
        public Func<T, T, bool> MatchFunc { get; set; }

        public bool Equals(T x, T y)
        {
            return MatchFunc != null && MatchFunc(x, y);
        }

        public int GetHashCode(T obj)
        {
            return 0;
        }
    }
}
