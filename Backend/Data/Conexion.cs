using Npgsql;

namespace Backend.Data
{
  public class Connection
  {
    //No borren, comentenlo
    //private static string databaseURL =
    //  "Server=localhost;Port=5432;Database=ubytec; User Id=postgres;Password=2019;";

    private static string databaseURL = "Data Source=DESKTOP-LMJ5G1R\\SQLEXPRESS;Initial Catalog=DetailTEC;Integrated Security=True";

    public static NpgsqlConnection Get() // Singleton
    {
      return new NpgsqlConnection(databaseURL); ;
    }
  }
}
