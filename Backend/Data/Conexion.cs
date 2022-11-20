using Npgsql;

namespace Backend.Data
{
  public class Connection
  {
    //No borren, comentenlo
    private static string databaseURL =
      "Server=localhost;Port=5432;Database=UbyTEC; User Id=postgres;Password=1629110401;";

    //private static string databaseURL = "Data Source=DESKTOP-LMJ5G1R\\SQLEXPRESS;Initial Catalog=DetailTEC;Integrated Security=True";

    public static NpgsqlConnection Get() // Singleton
    {
      return new NpgsqlConnection(databaseURL); ;
    }
  }
}
