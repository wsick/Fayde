using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Fayde.Demos.SDBDemo.Services.GoogleMusicAPI
{
    public class FormBuilder
    {
        string boundary = "----------" + DateTime.Now.Ticks.ToString("x");
        MemoryStream ms;

        public static FormBuilder Empty
        {
            get
            {
                FormBuilder b = new FormBuilder();
                b.Close();
                return b;
            }
        }

        public String ContentType
        {
            get
            {
                return "multipart/form-data; boundary=" + boundary;
            }
        }

        public FormBuilder()
        {
            ms = new MemoryStream();
        }

        public void AddFields(Dictionary<String, String> fields)
        {
            foreach (KeyValuePair<String, String> key in fields)
                this.AddField(key.Key, key.Value);
        }

        public void AddField(String key, String value)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("\r\n--{0}\r\n", boundary);
            sb.AppendFormat("Content-Disposition: form-data; name=\"{0}\";\r\n\r\n{1}", key, value);

            byte[] sbData = Encoding.UTF8.GetBytes(sb.ToString());

            ms.Write(sbData, 0, sbData.Length);
        }

        public void AddFile(String name, String fileName, byte[] file)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("\r\n--{0}\r\n", boundary);
            sb.AppendFormat("Content-Disposition: form-data; name=\"{0}\"; filename=\"{1}\"\r\n", name, fileName);

            sb.AppendFormat("Content-Type: {0}\r\n\r\n", "application/octet-stream");

            byte[] sbData = Encoding.UTF8.GetBytes(sb.ToString());
            ms.Write(sbData, 0, sbData.Length);

            ms.Write(file, 0, file.Length);
        }

        public void Close()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("\r\n--" + boundary + "--\r\n");

            byte[] sbData = Encoding.UTF8.GetBytes(sb.ToString());
            ms.Write(sbData, 0, sbData.Length);
        }

        public byte[] GetBytes()
        {
            return ms.ToArray();
        }

        public String GetString()
        {
            byte[] bytes = GetBytes();
            return Encoding.UTF8.GetString(bytes, 0, bytes.Length);
        }
    }
}