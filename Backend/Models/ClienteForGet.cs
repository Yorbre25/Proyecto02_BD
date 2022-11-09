namespace Backend.Models
{
  public class ClienteForGet
  {
    public int id { get; set; }
    public string name { get; set; }
    public string lastName1 { get; set; }
    public string? lastName2 { get; set; }
    public string province { get; set; }
    public string city { get; set; }
    public string district { get; set; }
    public string userName { get; set; }
    public string phoneNumber { get; set; }
    public DateTime birthdate { get; set; }
  }
}
