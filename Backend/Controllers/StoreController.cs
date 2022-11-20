using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("store")]
    public class StoreController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public Object Get()
        {
            try
            {
                List<Store> stores = StoreData.GetAll();
                return new
                {
                    status = "ok",
                    stores = stores
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
                Store store = StoreData.Get(id);
                return new
                {
                    status = "ok",
                    store = store
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
        public Object Post([FromBody] Store store)
        {
            bool ok = StoreData.Add(store);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tienda registrada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar la tienda"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        public Object Put([FromBody] Store store, int id)
        {
            bool ok = StoreData.Edit(store, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tienda modificada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar la tienda"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public Object Delete(int id)
        {
            bool ok = StoreData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tienda eliminada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar la tienda"
                };
            }
        }
    }
}
