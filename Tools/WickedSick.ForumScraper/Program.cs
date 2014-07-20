using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using Spring.Context;
using Spring.Context.Support;
using NHibernate;
using NHibernate.Context;
using System.Threading;

namespace WickedSick.ForumScraper
{
    class Program
    {
        private static readonly List<string> URLS = new List<string>() { 
            "http://forums.silverlight.net/t/239225.aspx/1/10000?Silverlight+App+s+won+t+run+on+Windows+8+preview",
            "http://forums.silverlight.net/t/207892.aspx/1/10000?Is+this+official+now",
            "http://forums.silverlight.net/t/241149.aspx/1/10000?Silverlight+Future+HTML+5+Windows+8+browsers+not+supporting+Pluggins",
            "http://forums.silverlight.net/t/239727.aspx/1/10000?I+am+a+silverlight+developer+that+must+write+silverlight+code+and+need+to+know+if+he+can",
            "http://forums.silverlight.net/t/230502.aspx/1/10000?Windows+8+apps+going+html5+wtf",
            "http://forums.silverlight.net/t/230725.aspx/1/10000?Windows+8+apps+going+html5+wtf+part+2",
            "http://forums.silverlight.net/t/231470.aspx/1/10000?Windows+8+apps+going+html5+wtf+part+3",
            "http://forums.silverlight.net/t/239388.aspx/1/10000?What+is+the+future+of+Silverlight+and+XAML+to+build+web+applications" };

        static void Main(string[] args)
        {
            ExtractMembers();
        }

        private static void ExtractMembers()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            ISLForumMemberRepository repo = (ISLForumMemberRepository)ctx.GetObject("SLForumMemberRepository");
            ISessionFactory sessionFactory = (ISessionFactory)ctx.GetObject("FaydeSessionFactory");
            ISession session = sessionFactory.OpenSession();
            CurrentSessionContext.Bind(session);
            using (ITransaction transaction = session.BeginTransaction())
            {
                foreach (string url in URLS)
                {
                    foreach (SLForumMember m in SLForumScraper.ScrapeMembers(url))
                    {
                        SLForumMember em = repo.FindBy(x => x.Username == m.Username);
                        if (em == null)
                            repo.Create(m);
                    }
                }
                transaction.Commit();
            }
        }
    }
}
