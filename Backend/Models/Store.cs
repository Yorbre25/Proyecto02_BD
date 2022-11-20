namespace Backend.Models
{
    public class Store
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string province { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public int? managerId { get; set; }
        public string? managerName { get; set; }
        public string? managerLastName1 { get; set; }
        public string? managerLastName2 { get; set; }
        public int? storeId { get; set; }
        public string? storeType { get; set; }
        public List<string>? phoneNumbers { get; set; }
    }
}
