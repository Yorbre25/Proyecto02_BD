using Backend.Models;
using Npgsql;
using System.Data;

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
                        id = Convert.ToInt32(dr["BarCode"]),
                        name = dr["Name"].ToString()!,
                        email = dr["CategoryName"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        managerName = dr["ManagerName"].ToString()!,
                        managerLastName1 = dr["ManagerLastName1"].ToString()!,
                        managerLastName2 = dr["ManagerLastName2"].ToString()!,
                        phoneNumbers = (List<string>)dr["PhoneNumbers"]

                    });
                }

                connection.Close();

                return storeList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar las tiendas");
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
                        id = Convert.ToInt32(dr["BarCode"]),
                        name = dr["Name"].ToString()!,
                        email = dr["CategoryName"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        managerName = dr["ManagerName"].ToString()!,
                        managerLastName1 = dr["ManagerLastName1"].ToString()!,
                        managerLastName2 = dr["ManagerLastName2"].ToString()!,
                        phoneNumbers = (List<string>)dr["PhoneNumbers"]
                    };
                }

                connection.Close();

                return store;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener la tienda");
            }
        }

        public static bool Add(Store store)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Store(
          {store.id},
          '{store.name}',
          '{store.email}',
          '{store.province}',
          '{store.city}',
          '{store.district}',
          '{store.storeId}',
          '{store.managerId}',
          '{store.phoneNumbers}'
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

        public static bool Edit(Store store, int id)
        {

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Store(
          {id},
          '{store.id}',
          '{store.name}',
          '{store.email}',
          '{store.province}',
          '{store.city}',
          '{store.district}',
          '{store.storeId}',
          '{store.managerId}',
          '{store.phoneNumbers}'
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
