namespace Backend.Models
{
    public class Manager
    {
        public int id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string lastName1 { get; set; }
        public string lastName2 { get; set; }
        public string email { get; set; }
        public string province { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string? password { get; set; }
        public string? oldPassword { get; set; }
        public List<string>? phoneNumbers { get; set; }
    }
}
