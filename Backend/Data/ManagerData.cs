using System.Data;
using Npgsql;

using Backend.Helpers;
using Backend.Models;

namespace Backend.Data
{
  public class ManagerData
  {
    public static Manager Get(int id)
    {
      Manager manager = new Manager();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Manager", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          manager = new Manager()
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

        return manager;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el manageristrador de comercio");
      }
    }

    public static bool Add(Manager manager)
    {
      //Hay que generarle una contraseña aleatoria
      manager.password = BCrypt.Net.BCrypt.HashPassword("ABC123");
      string phoneNumbers = AuxFunctions.arrayToString(manager.phoneNumbers);

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Manager(
          {manager.id},
          '{manager.username}',
          '{manager.name}',
          '{manager.lastName1}',
          '{manager.lastName2}',
          '{manager.email}',
          '{manager.province}',
          '{manager.city}',
          '{manager.district}',
          '{manager.password}',
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

    public static bool Edit(Manager manager, int managerID)
    {
      string hashedPassword = getEditPassword(manager, managerID);
      string phoneNumbers = AuxFunctions.arrayToString(manager.phoneNumbers);

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Manager(
          {managerID},
          {manager.id},
          '{manager.username}',
          '{manager.name}',
          '{manager.lastName1}',
          '{manager.lastName2}',
          '{manager.email}',
          '{manager.province}',
          '{manager.city}',
          '{manager.district}',
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
        $@"CALL Delete_Manager({id});", connection);

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

    private static string getEditPassword(Manager manager, int managerID)
    {
      string hashedPassword;

      Manager oldManager = Get(managerID);
      string oldPassword = PasswordData.getManagerPassword(oldManager.username).password;

      if (manager.password == null)
      {
        hashedPassword = oldPassword;
      }
      else
      {
        bool validPassword = PasswordValidator
          .ValidateManagerPassword(oldManager.username, manager.oldPassword!)
          .validPassword!.Value;

        if (!validPassword) throw new Exception("Contraseña incorrecta");

        hashedPassword = BCrypt.Net.BCrypt.HashPassword(manager.password);
      }

      return hashedPassword;
    }
  }
}
