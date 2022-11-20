using System.Data;
using Npgsql;

using Backend.Helpers;
using Backend.Models;

namespace Backend.Data
{
  public class StoreData
  {
    public static List<Store> GetAll()
    {
      List<Store> storeList = new List<Store>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Stores", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          storeList.Add(new Store()
          {
            id = Convert.ToInt32(dr["Id"]),
            name = dr["Name"].ToString()!,
            email = dr["Email"].ToString()!,
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            managerID = Convert.ToInt32(dr["ManagerId"]),
            storeTypeID = Convert.ToInt32(dr["StoreTypeId"]),
            storeTypeName = dr["StoreTypeName"].ToString()!,
            phoneNumbers = (string[])dr["PhoneNumbers"]
          });
        }

        connection.Close();

        return storeList;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar los afiliados");
      }
    }

    public static Store Get(int id)
    {
      Store store = new Store();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Store", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          store = new Store()
          {
            id = Convert.ToInt32(dr["Id"]),
            name = dr["Name"].ToString()!,
            email = dr["Email"].ToString()!,
            province = dr["Province"].ToString()!,
            city = dr["City"].ToString()!,
            district = dr["District"].ToString()!,
            managerID = Convert.ToInt32(dr["ManagerId"]),
            storeTypeID = Convert.ToInt32(dr["StoreTypeId"]),
            storeTypeName = dr["StoreTypeName"].ToString()!,
            phoneNumbers = (string[])dr["PhoneNumbers"]
          };
        }

        connection.Close();

        return store;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el afiliado");
      }
    }

    public static bool Add(Store store)
    {
      string phoneNumbers = AuxFunctions.arrayToString(store.phoneNumbers);

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Store(
          {store.id},
          '{store.name}',
          '{store.email}',
          '{store.province}',
          '{store.city}',
          '{store.district}',
          {store.storeTypeID},
          {store.managerID},
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

    public static bool Edit(Store store, int storeID)
    {
      string phoneNumbers = AuxFunctions.arrayToString(store.phoneNumbers);

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Store(
          {storeID},
          {store.id},
          '{store.name}',
          '{store.email}',
          '{store.province}',
          '{store.city}',
          '{store.district}',
          {store.storeTypeID},
          {store.managerID},
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
        $@"CALL Delete_Store({id});", connection);

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