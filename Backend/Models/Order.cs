namespace Backend.Models
{
    public class Order
    {
        public int id { get; set; }
        public int total { get; set; }
        public string shippingAddress { get; set; }
        public int clientId { get; set; }
        public int delManId { get; set; }
        public List<int> quantity { get; set; }
        public List<int> productBarCode { get; set; }
    }
}
