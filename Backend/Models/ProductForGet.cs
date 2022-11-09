namespace Backend.Models
{
    public class ProductForGet
    {
        public int barCode { get; set; }
        public int price { get; set; }
        public string name { get; set; }
        public int categoryId { get; set; }
        public string categoryName { get; set; }
        public List<string> photo { get; set; }
        public List<int> storeId { get; set; }
        public List<string> storeName { get; set; }
    }
}
