using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using HtmlAgilityPack;
using Fizzler.Systems.HtmlAgilityPack;

namespace WickedSick.ForumScraper
{
    public static class SLForumScraper
    {
        public static IEnumerable<SLForumMember> ScrapeMembers(string url)
        {
            string COMMENT_SEARCH = "li.comment-wrap";

            var doc = GetPage(url);
            return from h in doc.DocumentNode.QuerySelectorAll(COMMENT_SEARCH)
                   select parseMember(h);
        }

        private static SLForumMember parseMember(HtmlNode node)
        {
            string USERNAME_SEARCH = "h3.post-title a";
            string POST_LEVEL_SEARCH = "p.post-level";
            string POST_POINTS_SEARCH = "p.post-points";
            string POST_COUNT_SEARCH = "p.post-count";

            string ppString = node.QuerySelector(POST_POINTS_SEARCH).InnerText;
            ppString = ppString.Substring(0, ppString.IndexOf(' '));
            string pcString = node.QuerySelector(POST_COUNT_SEARCH).InnerText;
            pcString = pcString.Substring(0, pcString.IndexOf(' '));

            return new SLForumMember()
            {
                Username = node.QuerySelector(USERNAME_SEARCH).InnerText,
                PostLevel = node.QuerySelector(POST_LEVEL_SEARCH).InnerText,
                PostPoints = int.Parse(ppString),
                PostCount = int.Parse(pcString)
            };
        }

        private static HtmlDocument GetPage(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            var doc = new HtmlDocument();
            doc.Load(response.GetResponseStream(), Encoding.UTF8);
            return doc;
        }
    }
}
