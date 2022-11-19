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
        throw new Exception("Error al obtener el repartidor");
      }
    }
  }
}
