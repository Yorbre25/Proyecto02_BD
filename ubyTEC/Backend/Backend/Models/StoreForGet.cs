namespace Backend.Models
{
    public class StoreForGet
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string province { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public int managerId { get; set; }
        public string managerName { get; set; }
        public int storeType { get; set; }
        public List<string> phoneNumber { get; set; }
    }
}
