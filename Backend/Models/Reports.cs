namespace Backend.Models
{
  public class SalePerClient
  {
    public int clientID { get; set; }
    public string clientName { get; set; }
    public string clientLastName1 { get; set; }
    public string clientLastName2 { get; set; }
    public int totalPurchases { get; set; }
    public string storeName { get; set; }
    public string delManName { get; set; }
    public string delManLastName1 { get; set; }
    public string delManLastName2 { get; set; }
    public int totalPrice { get; set; }
  }

  public class SalePerStore
  {
    public int storeID { get; set; }
    public string storeName { get; set; }
    public int totalSales { get; set; }
    public int totalPrice { get; set; }
  }
}