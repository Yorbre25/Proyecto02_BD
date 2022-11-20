using Npgsql;

namespace Backend.Data
{
  public class Connection
  {
    //No borren, comentenlo
    private static string databaseURL =
      "Server=localhost;Port=5432;Database=ubytec; User Id=postgres;Password=1234;";

    public static NpgsqlConnection Get() // Singleton
    {
      return new NpgsqlConnection(databaseURL); ;
    }
  }
}