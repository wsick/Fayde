using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.ForumScraper
{
    public interface ICreateUpdateRepository<TEntity, TKey>
    {
        bool Create(TEntity entity);
        bool Create(IEnumerable<TEntity> items);
        bool Update(TEntity entity);
    }
}
