using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Web;

namespace Fayde.Website.demos.stackoverflow
{
    public class so : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            var cache = context.Application["Cache"] as Cache;
            if (cache == null)
                context.Application["Cache"] = cache = new Cache();

            string query = string.Format("tagged={0}&sort={1}", context.Request.QueryString["tagged"], context.Request.QueryString["sort"]);
            int pageNumber = 0;
            int.TryParse(context.Request.QueryString["page"], out pageNumber);
            var json = cache.GetPageJson(pageNumber, query);

            context.Response.Write(json);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    internal class Cache
    {
        public Cache()
        {
            Pages = new Dictionary<int, PageCache>();
        }

        public Dictionary<int, PageCache> Pages { get; set; }

        public string GetPageJson(int pageNumber, string query)
        {
            if (!Pages.ContainsKey(pageNumber))
                Pages[pageNumber] = RefreshPageCache(pageNumber, query);
            else if ((DateTime.UtcNow - Pages[pageNumber].RequestTime).TotalHours > 12)
                Pages[pageNumber] = RefreshPageCache(pageNumber, query);

            return Pages[pageNumber].JsonResponse;
        }

        private PageCache RefreshPageCache(int pageNumber, string query)
        {
            string json = null;
            if (pageNumber > 1)
                json = GetQuestionsFromStackOverflow(string.Format("{0}&pagesize=10&page={1}", query, pageNumber));
            else
                json = GetQuestionsFromStackOverflow(string.Format("{0}&pagesize=10", query));
            return new PageCache { JsonResponse = json, RequestTime = DateTime.UtcNow, };
        }

        private string GetQuestionsFromStackOverflow(string query)
        {
            var url = string.Format("https://api.stackexchange.com/2.1/questions?{0}&pagesize=10&order=desc&site=stackoverflow", query);

            var request = (HttpWebRequest)WebRequest.Create(url);

            using (var response = (HttpWebResponse)request.GetResponse())
            using (var sr = new StreamReader(response.GetEncodedStream(), System.Text.Encoding.UTF8))
            {
                return sr.ReadToEnd();
            }
        }
    }

    internal class PageCache
    {
        public string JsonResponse { get; set; }
        public DateTime RequestTime { get; set; }
    }

    internal static class HttpWebResponseEx
    {
        public static Stream GetEncodedStream(this HttpWebResponse response)
        {
            var stream = response.GetResponseStream();
            switch (response.ContentEncoding.ToUpperInvariant())
            {
                case "GZIP":
                    return new GZipStream(stream, CompressionMode.Decompress);
                case "DEFLATE":
                    return new DeflateStream(stream, CompressionMode.Decompress);
            }
            return stream;
        }
    }
}