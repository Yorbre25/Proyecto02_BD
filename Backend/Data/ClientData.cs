using System.Data;
using Npgsql;

using Backend.Models;

namespace Backend.Data
{
  public class ClientData
  {
    // public static bool Registrar(Client client)
    // {
    //   using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
    //   {
    //     SqlCommand cmd = new SqlCommand("client_registrar", oConexion);
    //     cmd.CommandType = CommandType.StoredProcedure;
    //     cmd.Parameters.AddWithValue("@Id", client.id);
    //     cmd.Parameters.AddWithValue("@Name", client.name);
    //     cmd.Parameters.AddWithValue("@LastName1", client.lastName1);
    //     cmd.Parameters.AddWithValue("@LastName2", client.lastName1);
    //     cmd.Parameters.AddWithValue("@Province", client.province);
    //     cmd.Parameters.AddWithValue("@City", client.city);
    //     cmd.Parameters.AddWithValue("@District", client.district);
    //     cmd.Parameters.AddWithValue("@PhoneNumber", client.phoneNumber);
    //     cmd.Parameters.AddWithValue("@Username", client.userName);
    //     cmd.Parameters.AddWithValue("@Password", client.password);
    //     cmd.Parameters.AddWithValue("@Birthdate", client.birthday.Date);
    //     try
    //     {
    //       oConexion.Open();
    //       cmd.ExecuteNonQuery();
    //       return true;
    //     }
    //     catch (Exception ex)
    //     {
    //       return false;
    //     }
    //   }
    // }

    // public static bool Modificar(Client client)
    // {
    //   using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
    //   {
    //     SqlCommand cmd = new SqlCommand("client_modificar", oConexion);
    //     cmd.CommandType = CommandType.StoredProcedure;
    //     cmd.Parameters.AddWithValue("@Id", client.id);
    //     cmd.Parameters.AddWithValue("@Name", client.name);
    //     cmd.Parameters.AddWithValue("@LastName1", client.lastName1);
    //     cmd.Parameters.AddWithValue("@LastName2", client.lastName1);
    //     cmd.Parameters.AddWithValue("@Province", client.province);
    //     cmd.Parameters.AddWithValue("@City", client.city);
    //     cmd.Parameters.AddWithValue("@District", client.district);
    //     cmd.Parameters.AddWithValue("@PhoneNumber", client.phoneNumber);
    //     cmd.Parameters.AddWithValue("@Username", client.userName);
    //     cmd.Parameters.AddWithValue("@Password", client.password);
    //     cmd.Parameters.AddWithValue("@Birthdate", client.birthday.Date);

    //     try
    //     {
    //       oConexion.Open();
    //       cmd.ExecuteNonQuery();
    //       return true;
    //     }
    //     catch (Exception ex)
    //     {
    //       return false;
    //     }
    //   }
    // }

    public static List<ClienteForGet> Listar()
    {
      List<ClienteForGet> oListaUsuario = new List<ClienteForGet>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Clients", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          oListaUsuario.Add(new ClienteForGet()
          {
            id = Convert.ToInt32(dr["Id"]),
            name = dr["Name"].ToString(),
            lastName1 = dr["LastName1"].ToString(),
            lastName2 = dr["LastName2"].ToString(),
            province = dr["Province"].ToString(),
            city = dr["City"].ToString(),
            district = dr["District"].ToString(),
            userName = dr["Username"].ToString(),
            phoneNumber = dr["PhoneNumber"].ToString(),
            birthdate = Convert.ToDateTime(dr["Birthdate"].ToString())
          });
        }

        connection.Close();

        return oListaUsuario;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar los clientes");
      }
    }

    public static ClienteForGet Obtener(int idusuario)
    {
      ClienteForGet oUsuario = new ClienteForGet();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Client", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      // Los parámetros tienen que ir en minuscula -> Ver definición de la función
      cmd.Parameters.AddWithValue("in_id", idusuario);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          oUsuario = new ClienteForGet()
          {
            id = Convert.ToInt32(dr["Id"]),
            name = dr["Name"].ToString(),
            lastName1 = dr["LastName1"].ToString(),
            lastName2 = dr["LastName2"].ToString(),
            province = dr["Province"].ToString(),
            city = dr["City"].ToString(),
            district = dr["District"].ToString(),
            userName = dr["Username"].ToString(),
            phoneNumber = dr["PhoneNumber"].ToString(),
            birthdate = Convert.ToDateTime(dr["Birthdate"].ToString())
          };
        }

        connection.Close();

        return oUsuario;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el cliente");
      }
    }

    // public static bool Eliminar(int id)
    // {
    //   using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
    //   {
    //     SqlCommand cmd = new SqlCommand("usp_eliminar", oConexion);
    //     cmd.CommandType = CommandType.StoredProcedure;
    //     cmd.Parameters.AddWithValue("@idusuario", id);

    //     try
    //     {
    //       oConexion.Open();
    //       cmd.ExecuteNonQuery();
    //       return true;
    //     }
    //     catch (Exception ex)
    //     {
    //       return false;
    //     }
    //   }
    // }
  }
}
