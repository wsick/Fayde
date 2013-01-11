using System;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace Fayde.Website.demos.sdb.Services.GoogleMusicAPI
{
    public class JSON
    {
        public static T DeserializeObject<T>(String data)
        {
            return Deserialize<T>(data);
        }

        public static T Deserialize<T>(String data)
        {
            var ms = new MemoryStream(Encoding.UTF8.GetBytes(data));
            var serializer = new DataContractJsonSerializer(typeof(T));
            return (T)serializer.ReadObject(ms);
        }

        public static string Serialize<T>(T obj)
        {
            using (var ms = new MemoryStream())
            {
                var serializer = new DataContractJsonSerializer(typeof(T));
                serializer.WriteObject(ms, obj);
                return Encoding.UTF8.GetString(ms.GetBuffer());
            }
        }
    }
}