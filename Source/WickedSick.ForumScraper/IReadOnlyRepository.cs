using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace WickedSick.ForumScraper
{
    public interface IReadOnlyRepository<TEntity, TKey> where TEntity : class
    {
        TEntity FindBy(TKey id);
        IQueryable<TEntity> All();
        TEntity FindBy(Expression<Func<TEntity, bool>> expression);
        IQueryable<TEntity> FilterBy(Expression<Func<TEntity, bool>> expression);
    }
}
