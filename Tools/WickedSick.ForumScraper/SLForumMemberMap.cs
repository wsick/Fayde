using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace WickedSick.ForumScraper
{
    public class SLForumMemberMap: ClassMap<SLForumMember>
    {
        public SLForumMemberMap()
        {
            Table("SLForumMembers");
            Id(x => x.Id).Column("SL_FORUM_MEMBER_ID");
            Map(x => x.Username);
            Map(x => x.PostLevel);
            Map(x => x.PostPoints);
            Map(x => x.PostCount);
        }    
    }
}
