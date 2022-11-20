using System.Data;
using Npgsql;

using Backend.Models;
using Backend.Helpers;
using System.Runtime.CompilerServices;

namespace Backend.Data
{
    public class ClientData
    {
        public static List<Client> GetAll()
        {
            List<Client> clientList = new List<Client>();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Clients", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    clientList.Add(new Client()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        username = dr["Username"].ToString()!,
                        name = dr["Name"].ToString()!,
                        lastName1 = dr["LastName1"].ToString()!,
                        lastName2 = dr["LastName2"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        phoneNumber = dr["PhoneNumber"].ToString()!,
                        birthday = Convert.ToDateTime(dr["Birthday"])!
                    });
                }

                connection.Close();

                return clientList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los clientes");
            }
        }

        public static Client Get(int id)
        {
            Client client = new Client();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_Client", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("in_id", id);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    client = new Client()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        username = dr["Username"].ToString()!,
                        name = dr["Name"].ToString()!,
                        lastName1 = dr["LastName1"].ToString()!,
                        lastName2 = dr["LastName2"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        phoneNumber = dr["PhoneNumber"].ToString()!,
                        birthday = Convert.ToDateTime(dr["Birthday"])!
                    };
                }

                connection.Close();

                return client;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el cliente");
            }
        }

        public static bool Add(Client client)
        {
            string passwordC = GenerateRandomPassword();
            _ = EmailSender.SendEmailAsync(client.name, client.username, "Envío de contraseña UbyTEC", "Contraseña: " + passwordC);

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Client(
            {client.id},
          '{client.name}',
          '{client.lastName1}',
          '{client.lastName2}',
          '{client.province}',
          '{client.city}',
          '{client.district}',
          '{client.phoneNumber}',
          '{client.username}',
          '{client.birthday}',
          '{passwordC}'
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

        public static bool Edit(Client client, int idClient)
        {

            Client current = ClientData.Get(idClient);

            string passUpdate = current.password;
            if (client.password != "" && client.oldPassword == current.password)
            {
                passUpdate = client.password;
            }

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Client(
          {idClient},
          {client.id},
          '{client.name}',
          '{client.lastName1}',
          '{client.lastName2}',
          '{client.province}',
          '{client.city}',
          '{client.district}',
          '{client.phoneNumber}',
          '{client.username}',
          '{client.birthday}',
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
              $@"CALL Delete_Client({id});", connection);

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

        private static string GenerateRandomPassword()
        {
            int passwordLength = 12;
            string password = "";

            Random random = new Random();
            for (int i = 0; i < passwordLength; i++)
            {
                password += (char)random.Next(35, 126);
            }

            return password;
        }
    }
}
