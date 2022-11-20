using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
    public class ManagerData
    {
        public static List<Manager> GetAll()
        {
            List<Manager> managerList = new List<Manager>();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Managers", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    managerList.Add(new Manager()
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
                        phoneNumbers = (List<String>)dr["PhoneNumbers"]
                    });
                }

                connection.Close();

                return managerList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los gerentes");
            }
        }

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
                        phoneNumbers = (List<String>)dr["PhoneNumbers"]
                    };
                }

                connection.Close();

                return manager;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el gerente");
            }
        }

        public static bool Add(Manager manager)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Manager(
          {manager.id},
          '{manager.name}',
          '{manager.lastName1}',
          '{manager.lastName2}',
          '{manager.email}',
          '{manager.province}',
          '{manager.city}',
          '{manager.district}',
          '{manager.username}',
          '{manager.phoneNumbers}',
          '{manager.password}'
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

        public static bool Edit(Manager manager, int id)
        {

            Manager current = ManagerData.Get(id);

            string passUpdate = current.password;
            if (manager.password != "" && manager.oldPassword == current.password)
            {
                passUpdate = manager.password;
            }


            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Manager(
          {id},
          '{manager.id}',
          '{manager.name}',
          '{manager.lastName1}',
          '{manager.lastName2}',
          '{manager.email}',
          '{manager.province}',
          '{manager.city}',
          '{manager.district}',
          '{manager.username}',
          '{manager.phoneNumbers}',
          '{passUpdate}'
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
    }
}
