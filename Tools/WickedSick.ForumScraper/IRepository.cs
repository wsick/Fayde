using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.ForumScraper
{
    public interface IRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>, ICreateUpdateRepository<TEntity, TKey>, IDeleteRepository<TEntity> where TEntity : class
    {
    }
}
