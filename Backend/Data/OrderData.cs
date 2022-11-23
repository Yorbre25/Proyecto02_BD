
using Backend.Helpers;
using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
  public class OrderData
  {
    public static List<Order> GetAll()
    {
      List<Order> orderList = new List<Order>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Orders", connection);
      cmd.CommandType = CommandType.StoredProcedure;


      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          orderList.Add(new Order()
          {
            id = Convert.ToInt32(dr["id"]),
            total = Convert.ToInt32(dr["Total"]),
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            clientName = dr["ClientName"].ToString()!,
            clientLastName = dr["ClientLastName"].ToString()!,
            delManName = dr["DelManName"].ToString()!,
            delManLastName = dr["DelManLastName"].ToString()!,
            storeId = Convert.ToInt32(dr["StoreId"]),
            productName = (string[])dr["Products"]
          });
        }

        connection.Close();

        return orderList;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar las ordenes");
      }
    }

    public static Order Get(int id)
    {
      Order order = new Order();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Order", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          order = new Order()
          {
            id = Convert.ToInt32(dr["id"]),
            total = Convert.ToInt32(dr["Total"]),
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            clientName = dr["ClientName"].ToString()!,
            clientLastName = dr["ClientLastName"].ToString()!,
            delManName = dr["DelManName"].ToString()!,
            delManLastName = dr["DelManLastName"].ToString()!,
            productName = (string[])dr["Products"]
          };
        }

        connection.Close();

        return order;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener la orden");
      }
    }

    public static bool Add(Order order)
    {
      string barCodes = AuxFunctions.arrayToString(order.productBarCode.ConvertAll<string>(x => x.ToString()).ToArray());
      string quantities = AuxFunctions.arrayToString(order.quantity.ConvertAll<string>(x => x.ToString()).ToArray());
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Order(
          {order.province},
          '{order.city}',
          '{order.district}',
          '{order.clientId}',
					'{order.storeId}',
          '{barCodes}',
          '{quantities}'

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

    public static bool Edit(Order order, int id)
    {
      string barCodes = AuxFunctions.arrayToString(order.productBarCode.ConvertAll<string>(x => x.ToString()).ToArray());
      string quantities = AuxFunctions.arrayToString(order.quantity.ConvertAll<string>(x => x.ToString()).ToArray());

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Order(
          {id},
          '{order.id}',
          '{order.province}',
          '{order.city}',
          '{order.district}',
          '{order.clientId}',
          '{barCodes}',
          '{quantities}'
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
        $@"CALL Delete_Order({id});", connection);

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

    public static bool SetDelivered(int id)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Order_Delivered({id});", connection);

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
