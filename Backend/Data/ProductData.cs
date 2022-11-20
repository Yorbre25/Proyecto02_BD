using Backend.Models;
using Npgsql;
using System.Data;

namespace Backend.Data
{
    public class ProductData
    {
        public static List<Product> GetAll()
        {
            List<Product> productList = new List<Product>();
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Products", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    productList.Add(new Product()
                    {
                        barCode = Convert.ToInt32(dr["BarCode"]),
                        price = Convert.ToInt32(dr["Price"]),
                        name = dr["Name"].ToString()!,
                        categoryName = dr["CategoryName"].ToString()!

                    });
                }

                connection.Close();

                return productList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los productos");
            }
        }

        public static Product Get(int id)
        {
            Product product = new Product();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_Product", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("in_id", id);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    product = new Product()
                    {
                        barCode = Convert.ToInt32(dr["BarCode"]),
                        price = Convert.ToInt32(dr["Price"]),
                        name = dr["Name"].ToString()!,
                        categoryName = dr["CategoryName"].ToString()!
                    };
                }

                connection.Close();

                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el producto");
            }
        }

        public static bool Add(Product product)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Product(
          {product.barCode},
          '{product.price}',
          '{product.name}',
          '{product.categoryId}',
          '{product.photo}',
          '{product.storeId}'
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

        public static bool Edit(Product product, int id)
        {

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Product(
          {id},
          '{product.barCode}',
          '{product.price}',
          '{product.name}',
          '{product.categoryId}',
          '{product.photo}',
          '{product.storeId}'
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
              $@"CALL Delete_Product({id});", connection);

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
