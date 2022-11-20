using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("productcategory")]
    public class ProductCategoryController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public Object Get()
        {
            try
            {
                List<ProductCategory> productCats = ProductCategoryData.GetAll();
                return new
                {
                    status = "ok",
                    productCats = productCats
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
        public Object Get(int id)
        {
            try
            {
                ProductCategory productCat = ProductCategoryData.Get(id);
                return new
                {
                    status = "ok",
                    productCat = productCat
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
        public Object Post([FromBody] ProductCategory productCat)
        {
            bool ok = ProductCategoryData.Add(productCat);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Categoria de producto registrada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar la categoria de producto"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        public Object Put([FromBody] ProductCategory productCat, int id)
        {
            bool ok = ProductCategoryData.Edit(productCat, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Categoria de producto modificada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar la categoria de producto"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public Object Delete(int id)
        {
            bool ok = ProductCategoryData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Categoria de producto eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar la categoria de producto"
                };
            }
        }
    }
}
