using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
    public class ProductCategoryData
    {
        public static List<ProductCategory> GetAll()
        {
            List<ProductCategory> productCatList = new List<ProductCategory>();
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Product_Categories", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    productCatList.Add(new ProductCategory()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString()!

                    });
                }

                connection.Close();

                return productCatList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar las categorias");
            }
        }

        public static ProductCategory Get(int id)
        {
            ProductCategory productCat = new ProductCategory();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_Product_Category", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("in_id", id);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    productCat = new ProductCategory()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        name = dr["Name"].ToString()!
                    };
                }

                connection.Close();

                return productCat;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener la categoria");
            }
        }

        public static bool Add(ProductCategory productCat)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Product_Category(
          {productCat.name}
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

        public static bool Edit(ProductCategory productCat, int id)
        {

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Product_Category(
          {id},
          '{productCat.name}'
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
              $@"CALL Delete_Product_Category({id});", connection);

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
