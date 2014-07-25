using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.ForumScraper
{
    public class SLForumMember
    {
        public virtual int Id { get; set; }
        public virtual string Username { get; set; }
        public virtual string PostLevel { get; set; }
        public virtual int PostPoints { get; set; }
        public virtual int PostCount { get; set; }
    }
}
