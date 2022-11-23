namespace Backend.Models
{
  public class Order
  {
    public int id { get; set; }
    public int? total { get; set; }
    public string province { get; set; }
    public string city { get; set; }
    public string district { get; set; }
    public int clientId { get; set; }
    public int delManId { get; set; }
    public int storeId { get; set; }
    public string? clientName { get; set; }
    public string? delManName { get; set; }
    public string? clientLastName { get; set; }
    public string? delManLastName { get; set; }
    public List<int>? quantity { get; set; }
    public List<int>? productBarCode { get; set; }
    public string[]? productName { get; set; }
  }
}
