using System.Data;
using Npgsql;

using Backend.Models;
using Backend.Helpers;

namespace Backend.Data
{
    public class ClientData
    {
        public static bool Add(Client client)
        {
            string passwordC = EmailSender.GenerateRandomPassword();
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
          '{client.birthday.Date}',
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
            string hashedPassword = getEditPassword(client, id);

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
          '{hashedPassword}'
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

        public static List<ClienteForGet> GetAll()
        {
            List<ClienteForGet> oListaUsuario = new List<ClienteForGet>();

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
                    oListaUsuario.Add(new ClienteForGet()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString(),
                        lastName1 = dr["LastName1"].ToString(),
                        lastName2 = dr["LastName2"].ToString(),
                        province = dr["Province"].ToString(),
                        city = dr["City"].ToString(),
                        district = dr["District"].ToString(),
                        userName = dr["Username"].ToString(),
                        phoneNumber = dr["PhoneNumber"].ToString(),
                        birthdate = Convert.ToDateTime(dr["Birthdate"].ToString())
                    });
                }

                connection.Close();

                return oListaUsuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los clientes");
            }
        }

        public static ClienteForGet Get(int idusuario)
        {
            ClienteForGet oUsuario = new ClienteForGet();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_Client", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            // Los parámetros tienen que ir en minuscula -> Ver definición de la función
            cmd.Parameters.AddWithValue("in_id", idusuario);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    oUsuario = new ClienteForGet()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString(),
                        lastName1 = dr["LastName1"].ToString(),
                        lastName2 = dr["LastName2"].ToString(),
                        province = dr["Province"].ToString(),
                        city = dr["City"].ToString(),
                        district = dr["District"].ToString(),
                        userName = dr["Username"].ToString(),
                        phoneNumber = dr["PhoneNumber"].ToString(),
                        birthdate = Convert.ToDateTime(dr["Birthdate"].ToString())
                    };
                }

                connection.Close();

                return oUsuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el cliente");
            }
        }

        private static string getEditPassword(Client client, int id)
        {
            string hashedPassword;

            Admin oldCli = Get(id);
            string oldPassword = PasswordData.getClientPassword(oldCli.username);

            if (client.password == null)
            {
                hashedPassword = oldPassword;
            }
            else
            {
                bool validPassword = PasswordValidator.ValidatePassword(
                  oldCli.username,
                  client.oldPassword!,
                  "client"
                );

                if (!validPassword) throw new Exception("Contraseña incorrecta");

                hashedPassword = BCrypt.Net.BCrypt.HashPassword(client.password);
            }

            return hashedPassword;
        }
    }
}
