using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Fayde.Demos.SDBDemo.Services.GoogleMusicAPI
{
    [DataContract]
    public class GoogleMusicSongUrl
    {
        [DataMember(Name = "url")]
        public String URL { get; set; }
    };

    [DataContract]
    public class AddPlaylistResp
    {
        [DataMember(Name = "id")]
        public String ID { get; set; }

        [DataMember(Name = "title")]
        public String Title { get; set; }

        [DataMember(Name = "success")]
        public bool Success { get; set; }
    }

    [DataContract]
    public class DeletePlaylistResp
    {
        [DataMember(Name = "deleteId")]
        public String ID { get; set; }
    }

    [DataContract]
    public class GoogleMusicPlaylists
    {
        [DataMember(Name = "playlists")]
        public List<GoogleMusicPlaylist> UserPlaylists { get; set; }

        [DataMember(Name = "magicPlaylists")]
        public List<GoogleMusicPlaylist> InstantMixes { get; set; }
    }

    [DataContract]
    public class GoogleMusicPlaylist
    {
        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "playlistId")]
        public string PlaylistID { get; set; }

        [DataMember(Name = "requestTime")]
        public double RequestTime { get; set; }

        [DataMember(Name = "continuationToken")]
        public string ContToken { get; set; }

        [DataMember(Name = "differentialUpdate")]
        public bool DiffUpdate { get; set; }

        [DataMember(Name = "playlist")]
        public List<GoogleMusicSong> Songs { get; set; }

        [DataMember(Name = "continuation")]
        public bool Cont { get; set; }

        public string TrackString
        {
            get { return Songs.Count + " tracks"; }
        }
    }

    [DataContract]
    public class GoogleMusicSong
    {
        string albumart;

        [DataMember(Name = "genre")]
        public string Genre { get; set; }

        [DataMember(Name = "beatsPerMinute")]
        public int BPM { get; set; }

        [DataMember(Name = "albumArtistNorm")]
        public string AlbumArtistNorm { get; set; }

        [DataMember(Name = "artistNorm")]
        public string ArtistNorm { get; set; }

        [DataMember(Name = "album")]
        public string Album { get; set; }

        [DataMember(Name = "lastPlayed")]
        public double LastPlayed { get; set; }

        [DataMember(Name = "type")]
        public int Type { get; set; }

        [DataMember(Name = "disc")]
        public int Disc { get; set; }

        [DataMember(Name = "id")]
        public string ID { get; set; }

        [DataMember(Name = "composer")]
        public string Composer { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "albumArtist")]
        public string AlbumArtist { get; set; }

        [DataMember(Name = "totalTracks")]
        public int TotalTracks { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "totalDiscs")]
        public int TotalDiscs { get; set; }

        [DataMember(Name = "year")]
        public int Year { get; set; }

        [DataMember(Name = "titleNorm")]
        public string TitleNorm { get; set; }

        [DataMember(Name = "artist")]
        public string Artist { get; set; }

        [DataMember(Name = "albumNorm")]
        public string AlbumNorm { get; set; }

        [DataMember(Name = "track")]
        public int Track { get; set; }

        [DataMember(Name = "durationMillis")]
        public long Duration { get; set; }

        [DataMember(Name = "albumArt")]
        public string AlbumArt { get; set; }

        [DataMember(Name = "deleted")]
        public bool Deleted { get; set; }

        [DataMember(Name = "url")]
        public string URL { get; set; }

        [DataMember(Name = "creationDate")]
        public float CreationDate { get; set; }

        [DataMember(Name = "playCount")]
        public int Playcount { get; set; }

        [DataMember(Name = "rating")]
        public int Rating { get; set; }

        [DataMember(Name = "comment")]
        public string Comment { get; set; }

        [DataMember(Name = "albumArtUrl")]
        public string ArtURL
        {
            get
            {
                return (albumart != null && !albumart.StartsWith("http:")) ? "http:" + albumart : albumart;
            }
            set { albumart = value; }
        }

        public string ArtistAlbum
        {
            get
            {
                return Artist + ", " + Album;
            }
        }
    }
}