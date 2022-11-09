using System.Data;
using Npgsql;

using Backend.Models;

namespace Backend.Data
{
  public class AdminData
  {
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
            // phoneNumbers = (List<String>)dr["PhoneNumbers"] Descomentar cuando el query este listo
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
            // phoneNumbers = (List<String>)dr["PhoneNumbers"] Descomentar cuando el query este listo
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

    public static bool Add(Admin admin)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Administrator(
          {admin.id},
          '{admin.name}',
          '{admin.lastName1}',
          '{admin.lastName2}',
          '{admin.email}',
          '{admin.province}',
          '{admin.city}',
          '{admin.district}',
          '{admin.username}',
          '{admin.password}'
        );", connection
      );
      // Faltan teléfonooooos
      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        connection.Close();
        return true;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        return false;
      }
    }

    public static bool Edit(Admin admin, int adminID)
    {
      /* Hay que verificar que admin.oldPassword coincida
      con la password guardada en la base */

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Administrator(
          {adminID},
          {admin.id},
          '{admin.name}',
          '{admin.lastName1}',
          '{admin.lastName2}',
          '{admin.email}',
          '{admin.province}',
          '{admin.city}',
          '{admin.district}',
          '{admin.username}',
          '{admin.password}'
        );", connection
      );
      // Faltan teléfonooooos
      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        connection.Close();
        return true;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        return false;
      }
    }

    public static bool Delete(int id)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Delete_Administrator({id});", connection);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        connection.Close();
        return true;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        return false;
      }
    }
  }
}
