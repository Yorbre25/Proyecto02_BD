using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
    public class DeliveryManData
    {

        public static List<DeliveryManForGet> Listar()
        {
            List<DeliveryManForGet> oListaUsuario = new List<DeliveryManForGet>();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_DeliveryMan", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    oListaUsuario.Add(new DeliveryManForGet()
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

                    });
                }



                connection.Close();

                return oListaUsuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los repartidores");
            }
        }

        public static ClienteForGet Obtener(int idusuario)
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
    }
}
