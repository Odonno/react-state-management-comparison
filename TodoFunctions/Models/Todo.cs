using Newtonsoft.Json;

namespace TodoFunctions.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Content { get; set; }

        [JsonIgnore]
        public bool IsDeleted { get; set; }
    }
}
