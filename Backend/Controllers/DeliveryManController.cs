using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("delivery_man")]
    public class DeliveryManController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        /**
        * Proporciona por medio del API la lista de repartidores
        * 
        */
        public Object Get()
        {
            try
            {
                List<DeliveryMan> deliveryMen = DeliveryManData.GetAll();
                return new
                {
                    status = "ok",
                    deliveryMen = deliveryMen
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
         * Proporciona por medio del API el repartidor con el id dado
         * 
         */
        public Object Get(int id)
        {
            try
            {
                DeliveryMan deliveryMan = DeliveryManData.Get(id);
                return new
                {
                    status = "ok",
                    deliveryMan = deliveryMan
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
         * Agrega por medio del API un repartidor a la base
         * Recibe un objeto deliveryMan por medio del un JSON
         */
        public Object Post([FromBody] DeliveryMan deliveryMan)
        {
            bool ok = DeliveryManData.Add(deliveryMan);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Repartidor registrado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar el repartidor"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        /**
         * Actualiza por medio del API un repartidor a la base
         * Recibe un objeto deliveryMan por medio del un JSON
         */
        public Object Put([FromBody] DeliveryMan deliveryMan, int id)
        {
            bool ok = DeliveryManData.Edit(deliveryMan, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Repartidor modificado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar el repartidor"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        /**
         * Elimina el repartidor que tenga el id dado
         */
        public Object Delete(int id)
        {
            bool ok = DeliveryManData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Repartidor eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar el repartidor"
                };
            }
        }
    }
}