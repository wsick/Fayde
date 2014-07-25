using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.ForumScraper
{
    public interface IDeleteRepository<TEntity>
    {
        bool Delete(TEntity entity);
        bool Delete(IEnumerable<TEntity> entities);
    }
}
