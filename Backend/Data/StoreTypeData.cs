using System.Data;
using Npgsql;

using Backend.Helpers;
using Backend.Models;

namespace Backend.Data
{
  public class StoreTypeData
  {
    public static List<StoreType> GetAll()
    {
      List<StoreType> storeTypeList = new List<StoreType>();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Store_Types", connection);
      cmd.CommandType = CommandType.StoredProcedure;

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          storeTypeList.Add(new StoreType()
          {
            id = dr["Id"].ToString()!,
            name = dr["Name"].ToString()!
          });
        }

        connection.Close();

        return storeTypeList;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al listar los tipos de comercio");
      }
    }

    public static StoreType Get(int id)
    {
      StoreType storeType = new StoreType();

      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand("Get_Store_Type", connection);
      cmd.CommandType = CommandType.StoredProcedure;
      cmd.Parameters.AddWithValue("in_id", id);

      try
      {
        connection.Open();
        cmd.ExecuteNonQuery();
        var dr = cmd.ExecuteReader();

        while (dr.Read())
        {
          storeType = new StoreType()
          {
            id = dr["Id"].ToString()!,
            name = dr["Name"].ToString()!
          };
        }

        connection.Close();

        return storeType;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        throw new Exception("Error al obtener el tipo de comercio");
      }
    }

    public static bool Add(StoreType storeType)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Insert_Store_Type('{storeType.name}');", connection);

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

    public static bool Edit(StoreType storeType, int storeTypeID)
    {
      var connection = Connection.Get();
      NpgsqlCommand cmd = new NpgsqlCommand(
        $@"CALL Update_Store_Type(
          '{storeType.id}',
          '{storeType.name}'
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
        $@"CALL Delete_Store_Type({id});", connection);

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
