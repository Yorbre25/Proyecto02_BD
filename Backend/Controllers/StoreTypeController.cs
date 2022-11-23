using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("store_types")]
    public class StoreTypeController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        /**
         * Proporciona por medio del API la lista de tipos de tienda
         * 
         */
        public Object Get()
        {
            try
            {
                List<StoreType> storeTypes = StoreTypeData.GetAll();
                return new
                {
                    status = "ok",
                    storeTypes = storeTypes
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
         * Proporciona por medio del API el tipo de tienda que tenga dicho id
         * 
         */
        public Object Get(int id)
        {
            try
            {
                StoreType storeType = StoreTypeData.Get(id);
                return new
                {
                    status = "ok",
                    storeType = storeType
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
         * Agrega por medio del API un tipo de tienda a la base
         * Recibe un objeto storetype por medio del un JSON
         */
        public Object Post([FromBody] StoreType storeType)
        {
            bool ok = StoreTypeData.Add(storeType);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Tipo de tienda registrado correctamente"
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
        /**
         * Actualiza por medio del API un tipo de tienda a la base
         * Recibe un objeto storetype por medio del un JSON
         */
        public Object Put([FromBody] StoreType storeType, int id)
        {
            bool ok = StoreTypeData.Edit(storeType, id);
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
        /**
         * Elimina un tipo de tienda
         */
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