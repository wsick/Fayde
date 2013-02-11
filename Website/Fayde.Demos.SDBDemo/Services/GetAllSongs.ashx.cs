using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using Fayde.Demos.SDBDemo.Services.GoogleMusicAPI;

namespace Fayde.Demos.SDBDemo.Services
{
    public class GetAllSongs : IHttpHandler
    {
        private AutoResetEvent _WaitHandle = new AutoResetEvent(false);
        private List<GoogleMusicSong> _Songs;

        public void ProcessRequest(HttpContext context)
        {
            var api = new API();
            api.OnLoginComplete += OnLoginComplete;
            api.OnGetAllSongsComplete += OnSongsRetrieved;

            api.Login("brad.sickles@gmail.com", "cen.ter7");
            _WaitHandle.WaitOne();
            api.GetAllSongs();
            _WaitHandle.WaitOne();

            context.Response.ContentType = "text/plain";
            var songs = _Songs.OrderBy(s => s.Artist)
                .ThenBy(s => s.Album)
                .ThenBy(s => s.Title)
                .ToList();
            var response = JSON.Serialize(songs);
            context.Response.Write(response);
        }

        private void OnLoginComplete(object sender, EventArgs e)
        {
            _WaitHandle.Set();
        }

        private void OnSongsRetrieved(List<GoogleMusicSong> songList)
        {
            _Songs = songList;
            _WaitHandle.Set();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}