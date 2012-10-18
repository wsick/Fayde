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
            
            var url = string.Format("https://api.stackexchange.com/2.1/questions?{0}", context.Request.Url.Query);

            var request = (HttpWebRequest)WebRequest.Create(url);

            using (var response = (HttpWebResponse)request.GetResponse())
            using (var sr = new StreamReader(response.GetEncodedStream(), System.Text.Encoding.UTF8))
            {
                context.Response.Write(sr.ReadToEnd());
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
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