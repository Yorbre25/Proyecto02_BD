using Npgsql;
using System.Data;

namespace Backend.Data;

public class PasswordData
{
  public static string getAdminPassword(string username)
  {
    var connection = Connection.Get();
    NpgsqlCommand command = new NpgsqlCommand("get_admin_password", connection);
    command.CommandType = CommandType.StoredProcedure;
    command.Parameters.AddWithValue("in_username", username);

    string password = "";
    try
    {
      connection.Open();
      command.ExecuteNonQuery();
      var dr = command.ExecuteReader();

      while (dr.Read()) { password = dr.GetString(0)!; }

      connection.Close();

      return password;
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      throw new Exception("Error al obtener la contraseña del administrador");
    }
  }

  public static ManagerPasswordInfo getManagerPassword(string username)
  {
    var connection = Connection.Get();
    NpgsqlCommand command = new NpgsqlCommand("Get_Manager_Password", connection);
    command.CommandType = CommandType.StoredProcedure;
    command.Parameters.AddWithValue("in_username", username);

    ManagerPasswordInfo passwordInfo = new ManagerPasswordInfo();

    try
    {
      connection.Open();
      command.ExecuteNonQuery();
      var dr = command.ExecuteReader();

      while (dr.Read())
      {
        passwordInfo = new ManagerPasswordInfo()
        {
          id = Convert.ToInt32(dr["id"]),
          password = dr["password"].ToString()!,
          status = Convert.ToBoolean(dr["status"]),
          observation = dr["observation"].ToString()!
        };
      }

      connection.Close();

      return passwordInfo;
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      throw new Exception("Error al obtener la contraseña del administrador de comercio");
    }
  }

  public static string getClientPassword(string username)
  {
    var connection = Connection.Get();
    NpgsqlCommand command = new NpgsqlCommand("Get_Client_Password", connection);
    command.CommandType = CommandType.StoredProcedure;
    command.Parameters.AddWithValue("in_username", username);

    string password = "";
    try
    {
      connection.Open();
      command.ExecuteNonQuery();
      var dr = command.ExecuteReader();

      while (dr.Read()) { password = dr.GetString(0)!; }

      connection.Close();

      return password;
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      throw new Exception("Error al obtener la contraseña del cliente");
    }
  }

  public static string getDelManPassword(string username)
  {
    var connection = Connection.Get();
    NpgsqlCommand command = new NpgsqlCommand("Get_Deliveryman_Password", connection);
    command.CommandType = CommandType.StoredProcedure;
    command.Parameters.AddWithValue("in_username", username);

    string password = "";
    try
    {
      connection.Open();
      command.ExecuteNonQuery();
      var dr = command.ExecuteReader();

      while (dr.Read()) { password = dr.GetString(0)!; }

      connection.Close();

      return password;
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      throw new Exception("Error al obtener la contraseña del repartidor");
    }
  }
}

public struct ManagerPasswordInfo
{
  public int id;
  public string password;
  public bool status;
  public string observation;
  public bool? validPassword;
}