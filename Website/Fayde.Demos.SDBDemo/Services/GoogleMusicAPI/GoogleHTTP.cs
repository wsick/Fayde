using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace Fayde.Demos.SDBDemo.Services.GoogleMusicAPI
{
    public class GoogleHTTP
    {
        public delegate void RequestCompletedEventHandler(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error);

        public static String AuthroizationToken = null;
        public static CookieContainer AuthorizationCookieCont = new CookieContainer();
        public static CookieCollection AuthorizationCookies = new CookieCollection();

        private class RequestState
        {
            public HttpWebRequest Request;
            public byte[] UploadData;
            public RequestCompletedEventHandler CompletedCallback;

            public RequestState(HttpWebRequest request, byte[] uploadData, RequestCompletedEventHandler completedCallback)
            {
                Request = request;
                UploadData = uploadData;
                CompletedCallback = completedCallback;
            }
        }

        public HttpWebRequest UploadDataAsync(Uri address, FormBuilder form, RequestCompletedEventHandler complete)
        {
            return UploadDataAsync(address, form.ContentType, form.GetBytes(), complete);
        }

        public HttpWebRequest UploadDataAsync(Uri address, string contentType, byte[] data, RequestCompletedEventHandler completedCallback)
        {
            HttpWebRequest request = SetupRequest(address);

            if (!String.IsNullOrEmpty(contentType))
                request.ContentType = contentType;

            request.Method = "POST";
            RequestState state = new RequestState(request, data, completedCallback);
            IAsyncResult result = request.BeginGetRequestStream(OpenWrite, state);

            return request;
        }


        public HttpWebRequest DownloadStringAsync(Uri address, RequestCompletedEventHandler completedCallback, int millisecondsTimeout = 10000)
        {
            HttpWebRequest request = SetupRequest(address);
            request.Method = "GET";
            DownloadDataAsync(request, null, millisecondsTimeout, completedCallback);
            return request;
        }

        public void DownloadDataAsync(HttpWebRequest request, byte[] d, int millisecondsTimeout,
           RequestCompletedEventHandler completedCallback)
        {
            RequestState state = new RequestState(request, d, completedCallback);
            IAsyncResult result = request.BeginGetResponse(GetResponse, state);
        }


        public virtual HttpWebRequest SetupRequest(Uri address)
        {
            if (address == null)
                throw new ArgumentNullException("address");

            if (address.ToString().StartsWith("https://play.google.com/music/services/"))
            {
                address = new Uri(address.OriginalString + String.Format("?u=0&xt={0}", GoogleHTTP.GetCookieValue("xt")));
            }

            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(address);

            request.CookieContainer = AuthorizationCookieCont;

            if (AuthroizationToken != null)
                request.Headers[HttpRequestHeader.Authorization] = String.Format("GoogleLogin auth={0}", AuthroizationToken);


            return request;
        }

        void OpenWrite(IAsyncResult ar)
        {
            RequestState state = (RequestState)ar.AsyncState;

            try
            {
                // Get the stream to write our upload to
                using (Stream uploadStream = state.Request.EndGetRequestStream(ar))
                {
                    byte[] buffer = new Byte[checked((uint)Math.Min(1024, (int)state.UploadData.Length))];

                    MemoryStream ms = new MemoryStream(state.UploadData);

                    int bytesRead;
                    int i = 0;
                    while ((bytesRead = ms.Read(buffer, 0, buffer.Length)) != 0)
                    {
                        int prog = (int)Math.Floor(Math.Min(100.0,
                                (((double)(bytesRead * i) / (double)ms.Length) * 100.0)));


                        uploadStream.Write(buffer, 0, bytesRead);

                        i++;
                    }
                }

                IAsyncResult result = state.Request.BeginGetResponse(GetResponse, state);


            }
            catch (Exception ex)
            {
                if (state.CompletedCallback != null)
                    state.CompletedCallback(state.Request, null, null, ex);
            }
        }

        void GetResponse(IAsyncResult ar)
        {
            RequestState state = (RequestState)ar.AsyncState;
            HttpWebResponse response = null;
            Exception error = null;
            String result = "";

            try
            {
                response = (HttpWebResponse)state.Request.EndGetResponse(ar);
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream);

                    result = reader.ReadToEnd();

                }
            }
            catch (Exception ex)
            {
                error = ex;
            }

            if (state.CompletedCallback != null)
                state.CompletedCallback(state.Request, response, result, error);
        }

        public static String GetCookieValue(String cookieName)
        {
            foreach (Cookie cookie in AuthorizationCookies)
            {
                if (cookie.Name.Equals(cookieName))
                    return cookie.Value;
            }

            return null;
        }

        public static void SetCookieData(CookieContainer cont, CookieCollection coll)
        {
            AuthorizationCookieCont = cont;
            AuthorizationCookies = coll;
        }
    }
}