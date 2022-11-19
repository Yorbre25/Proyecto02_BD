using System.Data;
using Npgsql;

using Backend.Models;

namespace Backend.Data
{
  public class DeliveryManData
  {
    public static List<DeliveryMan> GetAll()
    {
      List<DeliveryMan> deliveryManList = new List<DeliveryMan>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Deliverymen", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          deliveryManList.Add(new DeliveryMan()
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
          });
        }

        connection.Close();

        return deliveryManList;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar los repartidores");
      }
    }

    public static DeliveryMan Get(int id)
    {
      DeliveryMan deliveryMan = new DeliveryMan();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Deliveryman", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          deliveryMan = new DeliveryMan()
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

        return deliveryMan;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el repartidor");
      }
    }

    public static bool Add(DeliveryMan deliveryMan)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Deliveryman(
          {deliveryMan.id},
          '{deliveryMan.username}',
          '{deliveryMan.name}',
          '{deliveryMan.lastName1}',
          '{deliveryMan.lastName2}',
          '{deliveryMan.email}',
          '{deliveryMan.province}',
          '{deliveryMan.city}',
          '{deliveryMan.district}',
          '{deliveryMan.password}',
          '{deliveryMan.phoneNumbers}'
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

    public static bool Edit(DeliveryMan deliveryMan, int deliveryManID)
    {
      /* Hay que verificar que deliveryMan.oldPassword coincida
      con la password guardada en la base */

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Deliveryman(
          {deliveryManID},
          {deliveryMan.id},
          '{deliveryMan.username}',
          '{deliveryMan.name}',
          '{deliveryMan.lastName1}',
          '{deliveryMan.lastName2}',
          '{deliveryMan.email}',
          '{deliveryMan.province}',
          '{deliveryMan.city}',
          '{deliveryMan.district}',
          '{deliveryMan.password}',
          '{deliveryMan.phoneNumbers}'
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
        $@"CALL Delete_Deliveryman({id});", connection);

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
