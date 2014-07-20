using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Linq;
using System.Linq.Expressions;

namespace WickedSick.ForumScraper
{
    public class Repository<T, K> : IRepository<T, K> where T : class
    {
        private ISessionFactory _sessionFactory;
        public ISessionFactory SessionFactory
        {
            get { return _sessionFactory; }
            set { _sessionFactory = value; }
        }

        #region IRepository<T, K> Members

        public bool Create(T entity)
        {
            SessionFactory.GetCurrentSession().Save(entity);
            return true;
        }

        public bool Create(IEnumerable<T> items)
        {
            foreach (T item in items)
            {
                SessionFactory.GetCurrentSession().SaveOrUpdate(item);
            }
            return true;
        }

        public bool Update(T entity)
        {
            SessionFactory.GetCurrentSession().Update(entity);
            return true;
        }

        public bool Delete(T entity)
        {
            SessionFactory.GetCurrentSession().Delete(entity);
            return true;
        }

        public bool Delete(IEnumerable<T> entities)
        {
            foreach (T entity in entities)
            {
                SessionFactory.GetCurrentSession().Delete(entity);
            }
            return true;
        }

        #endregion

        #region IReadOnlyRepository<T, K> Members

        public T FindBy(K id)
        {
            return SessionFactory.GetCurrentSession().Get<T>(id);
        }

        public IQueryable<T> All()
        {
            return SessionFactory.GetCurrentSession().Query<T>();
        }

        public T FindBy(Expression<Func<T, bool>> expression)
        {
            return FilterBy(expression).SingleOrDefault();
        }

        public IQueryable<T> FilterBy(Expression<Func<T, bool>> expression)
        {
            return All().Where(expression).AsQueryable();
        }

        #endregion
    }
}
