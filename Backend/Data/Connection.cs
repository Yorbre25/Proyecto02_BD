using Npgsql;

namespace Backend.Data
{
  public class Connection
  {
    //No borren, comentenlo
    //private static string databaseURL =
    // "Server=localhost;Port=5432;Database=ubytec; User Id=postgres;Password=1234;";

    private static string databaseURL =
        "Server=ubytecserverpost.postgres.database.azure.com;Database=ubytec;Port=5432;User Id=UBY;Password=tec1234*;Ssl Mode=Require;Trust Server Certificate=true;";
    public static NpgsqlConnection Get() // Singleton
    {
      return new NpgsqlConnection(databaseURL); ;
    }
  }
}