using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("storetype")]
    public class StoreTypeController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public Object Get()
        {
            try
            {
                List<StoreType> storetypes = StoreTypeData.GetAll();
                return new
                {
                    status = "ok",
                    storetypes = storetypes
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
                StoreType storetype = StoreTypeData.Get(id);
                return new
                {
                    status = "ok",
                    storetype = storetype
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
        public Object Post([FromBody] StoreType storetype)
        {
            bool ok = StoreTypeData.Add(storetype);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tipo de tienda registrada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar el tipo de tienda"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        public Object Put([FromBody] StoreType storetype, int id)
        {
            bool ok = StoreTypeData.Edit(storetype, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tipo de tienda modificado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar el tipo de tienda"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public Object Delete(int id)
        {
            bool ok = StoreTypeData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tipo de tienda eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar el tipo de tienda"
                };
            }
        }
    }
}
