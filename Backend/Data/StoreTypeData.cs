using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
    public class StoreTypeData
    {
        public static List<StoreType> GetAll()
        {
            List<StoreType> stypeList = new List<StoreType>();
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Store_Type", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    stypeList.Add(new StoreType()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString()!

                    });
                }

                connection.Close();

                return stypeList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los tipos de tienda");
            }
        }

        public static StoreType Get(int id)
        {
            StoreType stype = new StoreType();

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
                    stype = new StoreType()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString()!
                    };
                }

                connection.Close();

                return stype;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el tipo de tienda");
            }
        }

        public static bool Add(StoreType stype)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Store_Type(
          {stype.name}
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

        public static bool Edit(StoreType storetype, int id)
        {

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Store_Type(
          {id},
          '{storetype.name}'
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
