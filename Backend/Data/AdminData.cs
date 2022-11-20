using System.Data;
using Npgsql;

using Backend.Helpers;
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
            district = dr["District"].ToString()!
            // phoneNumbers = (string[])dr["PhoneNumbers"]
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
            phoneNumbers = (string[])dr["PhoneNumbers"]
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
      string hashedPassword = BCrypt.Net.BCrypt.HashPassword(admin.password);
      string phoneNumbers = AuxFunctions.arrayToString(admin.phoneNumbers);

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
          '{hashedPassword}',
          array{phoneNumbers}
        );", connection
      );

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
      string phoneNumbers = AuxFunctions.arrayToString(admin.phoneNumbers);
      string hashedPassword = getEditPassword(admin, adminID);

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
          '{hashedPassword}',
          array{phoneNumbers}
        );", connection
      );

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

    private static string getEditPassword(Admin admin, int adminID)
    {
      string hashedPassword;

      Admin oldAdmin = Get(adminID);
      string oldPassword = PasswordData.getAdminPassword(oldAdmin.username);

      if (admin.password == null)
      {
        hashedPassword = oldPassword;
      }
      else
      {
        bool validPassword = PasswordValidator.ValidatePassword(
          oldAdmin.username,
          admin.oldPassword!,
          "administrator"
        );

        if (!validPassword) throw new Exception("Contraseña incorrecta");

        hashedPassword = BCrypt.Net.BCrypt.HashPassword(admin.password);
      }

      return hashedPassword;
    }
  }
}
