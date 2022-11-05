namespace Backend.Models
{
    public class OrderForGet
    {
        public int id { get; set; }
        public int total { get; set; }
        public string shippingAddress { get; set; }
        public int clientId { get; set; }
        public int delManId { get; set; }
        public string cliendName { get; set; }
        public string deliveryName { get; set; }
        public List<int> quantity { get; set; }

        public List<int> productBarCode { get; set; }
        public List<string> productName { get; set; }
    }
}
