using Npgsql;
using System.Data;

namespace Backend.Data;

public class PasswordData{

    public static string getAdminPassword(string username){
        var connection = Connection.Get();
        NpgsqlCommand command = new NpgsqlCommand("get_admin_password", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.AddWithValue("in_username", username);

        string password = "";
        try{
            connection.Open();
            command.ExecuteNonQuery();
            var dr = command.ExecuteReader();
            while(dr.Read()){
                Console.WriteLine(dr.GetString(0));
                password = dr.GetString(0)!;
            }
            connection.Close();
            return password;
        }catch(Exception ex){
            Console.WriteLine(ex.Message);
            throw new Exception("Error al obtener la contraseña del administrador");
        }
    }


    public static string getManagerPassword(string email){
        return "";
    }
    public static string getClientPassword(string email){
        return "";
    }
}