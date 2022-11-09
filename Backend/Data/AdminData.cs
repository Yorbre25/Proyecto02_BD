using System.Data;
using Npgsql;

using Backend.Models;

namespace Backend.Data
{
  public class AdminData
  {
    // public static bool Registrar(Admin Admin)
    // {
    //   using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
    //   {
    //     SqlCommand cmd = new SqlCommand("Admin_registrar", oConexion);
    //     cmd.CommandType = CommandType.StoredProcedure;
    //     cmd.Parameters.AddWithValue("@Id", Admin.id);
    //     cmd.Parameters.AddWithValue("@Name", Admin.name);
    //     cmd.Parameters.AddWithValue("@LastName1", Admin.lastName1);
    //     cmd.Parameters.AddWithValue("@LastName2", Admin.lastName1);
    //     cmd.Parameters.AddWithValue("@Province", Admin.province);
    //     cmd.Parameters.AddWithValue("@City", Admin.city);
    //     cmd.Parameters.AddWithValue("@District", Admin.district);
    //     cmd.Parameters.AddWithValue("@PhoneNumber", Admin.phoneNumber);
    //     cmd.Parameters.AddWithValue("@Username", Admin.userName);
    //     cmd.Parameters.AddWithValue("@Password", Admin.password);
    //     cmd.Parameters.AddWithValue("@Birthdate", Admin.birthday.Date);
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

    // public static bool Modificar(Admin Admin)
    // {
    //   using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
    //   {
    //     SqlCommand cmd = new SqlCommand("Admin_modificar", oConexion);
    //     cmd.CommandType = CommandType.StoredProcedure;
    //     cmd.Parameters.AddWithValue("@Id", Admin.id);
    //     cmd.Parameters.AddWithValue("@Name", Admin.name);
    //     cmd.Parameters.AddWithValue("@LastName1", Admin.lastName1);
    //     cmd.Parameters.AddWithValue("@LastName2", Admin.lastName1);
    //     cmd.Parameters.AddWithValue("@Province", Admin.province);
    //     cmd.Parameters.AddWithValue("@City", Admin.city);
    //     cmd.Parameters.AddWithValue("@District", Admin.district);
    //     cmd.Parameters.AddWithValue("@PhoneNumber", Admin.phoneNumber);
    //     cmd.Parameters.AddWithValue("@Username", Admin.userName);
    //     cmd.Parameters.AddWithValue("@Password", Admin.password);
    //     cmd.Parameters.AddWithValue("@Birthdate", Admin.birthday.Date);

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

    public static List<Admin> GetAll()
    {
      List<Admin> adminList = new List<Admin>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Administrators", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          adminList.Add(new Admin()
          {
            id = Convert.ToInt32(dr["Id"]),
            username = dr["Username"].ToString()!,
            name = dr["Name"].ToString()!,
            lastName1 = dr["LastName1"].ToString()!,
            lastName2 = dr["LastName2"].ToString()!,
            email = dr["Email"].ToString()!,
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            // phoneNumber = (List<String>)dr["PhoneNumber"] Descomentar cuando el query este listo
          });
        }

        connection.Close();

        return adminList;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar los administradores");
      }
    }

    public static Admin Get(int id)
    {
      Admin admin = new Admin();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Administrator", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          admin = new Admin()
          {
            id = Convert.ToInt32(dr["Id"]),
            username = dr["Username"].ToString()!,
            name = dr["Name"].ToString()!,
            lastName1 = dr["LastName1"].ToString()!,
            lastName2 = dr["LastName2"].ToString()!,
            email = dr["Email"].ToString()!,
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            // phoneNumber = (List<String>)dr["PhoneNumber"] Descomentar cuando el query este listo
          };
        }

        connection.Close();

        return admin;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el administrador");
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
