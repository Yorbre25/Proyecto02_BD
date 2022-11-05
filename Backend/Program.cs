namespace UbyTec.Data;

using Npgsql;
// Clase que se encarga de la conexión a la base de datos
public class Program {

    static void Main(string[] args){
        new Program().Test();
        Console.ReadKey();
    }
    
    public void Test(){
        using(var cn = GetConnection()){
            cn.Open();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Clients", cn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            var reader = cmd.ExecuteReader();
            while(reader.Read()){
                Console.WriteLine(reader["Name"].ToString());
            }
        }
    }

    private NpgsqlConnection GetConnection(){
        return new NpgsqlConnection("Server=localhost;Port=5432;Database=UbyTec; User Id=postgres;Password=1234;");
    }
    
}