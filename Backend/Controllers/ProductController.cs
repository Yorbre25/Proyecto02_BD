using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        /**
         * Proporciona por medio del API la lista de productos
         * 
         */
        public Object Get()
        {
            try
            {
                List<Product> products = ProductData.GetAll();
                return new
                {
                    status = "ok",
                    products = products
                };
            }
            catch (System.Exception err)
            {
                return new
                {
                    status = "error",
                    message = err.Message
                };
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        /**
         * Proporciona por medio del API el producto relacionado al id
         * 
         */
        public Object Get(int id)
        {
            try
            {
                Product product = ProductData.Get(id);
                return new
                {
                    status = "ok",
                    product = product
                };
            }
            catch (System.Exception err)
            {
                return new
                {
                    status = "error",
                    message = err.Message
                };
            }
        }

        [HttpPost]
        [Route("add")]
        /**
         * Agrega por medio del API un producto a la base
         * Recibe un objeto product por medio del un JSON
         */
        public Object Post([FromBody] Product product)
        {
            bool ok = ProductData.Add(product);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Producto registrado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar el producto"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        /**
         * Actualiza por medio del API un producto a la base
         * Recibe un objeto product por medio del un JSON
         */
        public Object Put([FromBody] Product product, int id)
        {
            bool ok = ProductData.Edit(product, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Producto modificado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar el producto"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        /**
         * Elimina un producto que tenga el id dado
         */
        public Object Delete(int id)
        {
            bool ok = ProductData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Producto eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar el producto"
                };
            }
        }
    }
}
