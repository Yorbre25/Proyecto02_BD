using System.Data;
using Npgsql;

using Backend.Models;

namespace Backend.Data
{
  public class ReportData
  {
    public static List<SalePerClient> GetSalesPerClient()
    {
      List<SalePerClient> salesPerClient = new List<SalePerClient>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Sales_Per_Client", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          salesPerClient.Add(new SalePerClient()
          {
            clientID = Convert.ToInt32(dr["clientid"]),
            clientName = dr["clientname"].ToString()!,
            clientLastName1 = dr["clientlastname1"].ToString()!,
            clientLastName2 = dr["clientlastname2"].ToString()!,
            totalPurchases = Convert.ToInt32(dr["cantidad"]),
            storeName = dr["storename"].ToString()!,
            delManName = dr["deliverymanname"].ToString()!,
            delManLastName1 = dr["deliverymanlastname1"].ToString()!,
            delManLastName2 = dr["deliverymanlastname2"].ToString()!,
            totalPrice = Convert.ToInt32(dr["total"])
          });
        }

        connection.Close();

        return salesPerClient;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al generar el reporte de ventas por cliente");
      }
    }

    public static List<SalePerStore> GetSalesPerStore()
    {
      List<SalePerStore> salesPerStore = new List<SalePerStore>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Sales_Per_Store", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          salesPerStore.Add(new SalePerStore()
          {
            storeID = Convert.ToInt32(dr["storeid"]),
            storeName = dr["storename"].ToString()!,
            totalSales = Convert.ToInt32(dr["cantidad"]),
            totalPrice = Convert.ToInt32(dr["total"])
          });
        }

        connection.Close();

        return salesPerStore;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al generar el reporte de ventas por tienda");
      }
    }

  }
}
