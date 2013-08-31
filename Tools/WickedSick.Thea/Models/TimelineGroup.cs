using Newtonsoft.Json;

namespace WickedSick.Thea.Models
{
    public class TimelineGroup
    {
        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("Data")]
        public string Data { get; set; }

        [JsonProperty("Start")]
        public int Start { get; set; }

        [JsonProperty("Length")]
        public int Length { get; set; }
    }
}