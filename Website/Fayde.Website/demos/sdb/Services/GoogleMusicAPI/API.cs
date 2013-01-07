using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;

namespace Fayde.Website.demos.sdb.Services.GoogleMusicAPI
{
    public class API
    {
        #region Events
        public EventHandler OnLoginComplete;

        public delegate void _GetAllSongs(List<GoogleMusicSong> songList);
        public _GetAllSongs OnGetAllSongsComplete;

        public delegate void _AddPlaylist(AddPlaylistResp resp);
        public _AddPlaylist OnCreatePlaylistComplete;

        public delegate void _Error(Exception e);
        public _Error OnError;

        public delegate void _GetPlaylists(GoogleMusicPlaylists pls);
        public _GetPlaylists OnGetPlaylistsComplete;

        public delegate void _GetPlaylist(GoogleMusicPlaylist pls);
        public _GetPlaylist OnGetPlaylistComplete;

        public delegate void _GetSongURL(GoogleMusicSongUrl songurl);
        public _GetSongURL OnGetSongURL;

        public delegate void _DeletePlaylist(DeletePlaylistResp resp);
        public _DeletePlaylist OnDeletePlaylist;

        #endregion

        #region Members
        GoogleHTTP client;
        private List<GoogleMusicSong> trackContainer;
        #endregion

        #region Constructor
        public API()
        {
            client = new GoogleHTTP();
            trackContainer = new List<GoogleMusicSong>();
        }
        #endregion

        #region Login
        public void Login(String email, String password)
        {
            Dictionary<String, String> fields = new Dictionary<String, String>
            {
                {"service", "sj"},
                {"Email",  email},
                {"Passwd", password},
            };

            FormBuilder form = new FormBuilder();
            form.AddFields(fields);
            form.Close();

            client.UploadDataAsync(new Uri("https://www.google.com/accounts/ClientLogin"), form.ContentType, form.GetBytes(), GetAuthTokenComplete);
        }

        public void Login(String authToken)
        {
            GoogleHTTP.AuthroizationToken = authToken;
            GetAuthCookies();
        }

        private void GetAuthTokenComplete(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                OnError(error);
                return;
            }

            string CountTemplate = @"Auth=(?<AUTH>(.*?))$";
            Regex CountRegex = new Regex(CountTemplate, RegexOptions.IgnoreCase);
            string auth = CountRegex.Match(jsonData).Groups["AUTH"].ToString();

            GoogleHTTP.AuthroizationToken = auth;

            GetAuthCookies();
        }

        private void GetAuthCookies()
        {
            client.UploadDataAsync(new Uri("https://play.google.com/music/listen?hl=en&u=0"),
                FormBuilder.Empty, GetAuthCookiesComplete);
        }

        private void GetAuthCookiesComplete(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                OnError(error);
                return;
            }

            GoogleHTTP.SetCookieData(request.CookieContainer, response.Cookies);

            if (OnLoginComplete != null)
                OnLoginComplete(this, EventArgs.Empty);
        }
        #endregion

        #region GetAllSongs
        /// <summary>
        /// Gets all the songs
        /// </summary>
        /// <param name="continuationToken"></param>
        public void GetAllSongs(String continuationToken = "")
        {
            List<GoogleMusicSong> library = new List<GoogleMusicSong>();

            String jsonString = "{\"continuationToken\":\"" + continuationToken + "\"}";

            Dictionary<String, String> fields = new Dictionary<String, String>
            {
               {"json", jsonString}
            };

            FormBuilder form = new FormBuilder();
            form.AddFields(fields);
            form.Close();

            client.UploadDataAsync(new Uri("https://play.google.com/music/services/loadalltracks"), form, TrackListChunkRecv);
        }

        private void TrackListChunkRecv(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                OnError(error);
                return;
            }

            GoogleMusicPlaylist chunk = JSON.DeserializeObject<GoogleMusicPlaylist>(jsonData);

            trackContainer.AddRange(chunk.Songs);

            if (!String.IsNullOrEmpty(chunk.ContToken))
            {
                GetAllSongs(chunk.ContToken);
            }
            else
            {
                if (OnGetAllSongsComplete != null)
                    OnGetAllSongsComplete(trackContainer);
            }
        }
        #endregion

        #region AddPaylist
        /// <summary>
        /// Creates a playlist with given name
        /// </summary>
        /// <param name="playlistName">Name of playlist</param>
        public void AddPlaylist(String playlistName)
        {
            String jsonString = "{\"title\":\"" + playlistName + "\"}";

            Dictionary<String, String> fields = new Dictionary<String, String>
            {
               {"json", jsonString}
            };

            FormBuilder form = new FormBuilder();
            form.AddFields(fields);
            form.Close();

            client.UploadDataAsync(new Uri("https://play.google.com/music/services/addplaylist"), form, PlaylistCreated);
        }

        private void PlaylistCreated(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                ThrowError(error);
                return;
            }

            AddPlaylistResp resp = null;

            try
            {
                resp = JSON.DeserializeObject<AddPlaylistResp>(jsonData);
            }
            catch (Exception e)
            {
                ThrowError(error);
                return;
            }

            if (OnCreatePlaylistComplete != null)
                OnCreatePlaylistComplete(resp);
        }
        #endregion

        #region GetPlaylist
        /// <summary>
        /// Returns all user and instant playlists
        /// </summary>
        public void GetPlaylist(String plID = "all")
        {
            String jsonString = (plID.Equals("all")) ? "{}" : "{\"id\":\"" + plID + "\"}";

            Dictionary<String, String> fields = new Dictionary<String, String>() { };

            fields.Add("json", jsonString);

            FormBuilder builder = new FormBuilder();
            builder.AddFields(fields);
            builder.Close();

            if (plID.Equals("all"))
                client.UploadDataAsync(new Uri("https://play.google.com/music/services/loadplaylist"), builder, PlaylistRecv);
            else
                client.UploadDataAsync(new Uri("https://play.google.com/music/services/loadplaylist"), builder, PlaylistRecvSingle);
        }

        private void PlaylistRecvSingle(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                ThrowError(error);
                return;
            }

            GoogleMusicPlaylist pl = null;
            try
            {
                pl = JSON.DeserializeObject<GoogleMusicPlaylist>(jsonData);
            }
            catch (Exception e)
            {
                ThrowError(error);
                return;
            }

            if (OnGetPlaylistComplete != null)
                OnGetPlaylistComplete(pl);
        }

        private void PlaylistRecv(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                ThrowError(error);
                return;
            }

            GoogleMusicPlaylists playlists = null;
            try
            {
                playlists = JSON.DeserializeObject<GoogleMusicPlaylists>(jsonData);
            }
            catch (Exception e)
            {
                ThrowError(error);
                return;
            }

            if (OnGetPlaylistsComplete != null)
                OnGetPlaylistsComplete(playlists);
        }
        #endregion

        #region GetSongURL
        public void GetSongURL(String id)
        {
            client.DownloadStringAsync(new Uri(String.Format("https://play.google.com/music/play?u=0&songid={0}&pt=e", id)), SongUrlRecv);
        }

        private void SongUrlRecv(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                ThrowError(error);
                return;
            }

            GoogleMusicSongUrl url = null;
            try
            {
                url = JSON.DeserializeObject<GoogleMusicSongUrl>(jsonData);
            }
            catch (Exception e)
            {
                OnError(e);
            }

            if (OnGetSongURL != null)
                OnGetSongURL(url);

        }

        private void ThrowError(Exception error)
        {
            if (OnError != null)
                OnError(error);
        }
        #endregion

        #region DeletePlaylist
        //{"deleteId":"c790204e-1ee2-4160-9e25-7801d67d0a16"}
        public void DeletePlaylist(String id)
        {
            String jsonString = "{\"id\":\"" + id + "\"}";

            Dictionary<String, String> fields = new Dictionary<String, String>
            {
               {"json", jsonString}
            };

            FormBuilder form = new FormBuilder();
            form.AddFields(fields);
            form.Close();

            client.UploadDataAsync(new Uri("https://play.google.com/music/services/deleteplaylist"), form, PlaylistDeleted);
        }

        private void PlaylistDeleted(HttpWebRequest request, HttpWebResponse response, String jsonData, Exception error)
        {
            if (error != null)
            {
                ThrowError(error);
                return;
            }

            DeletePlaylistResp resp = null;
            try
            {
                resp = JSON.DeserializeObject<DeletePlaylistResp>(jsonData);
            }
            catch (System.Exception ex)
            {
                ThrowError(ex);
                return;
            }

            if (OnDeletePlaylist != null)
                OnDeletePlaylist(resp);
        }
        #endregion
    }
}