using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("order")]
    public class OrderController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        /**
         * Proporciona por medio del API la lista de ordenes
         * 
         */
        public Object Get()
        {
            try
            {
                List<Order> orders = OrderData.GetAll();
                return new
                {
                    status = "ok",
                    orders = orders
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
         * Proporciona por medio del API la orden relacionada al id
         * 
         */
        public Object Get(int id)
        {
            try
            {
                Order order = OrderData.Get(id);
                return new
                {
                    status = "ok",
                    order = order
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
        [Route("setdelivered/{id}")]
        /**
         * 
         * Hace que una orden esté terminada
         * 
         */
        public Object Delivered(int id)
        {
            bool ok = OrderData.SetDelivered(id);
            if (ok)
            {
                
                return new
                {
                    status = "ok",
                    message = "Orden entregada"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo finalizar la orden"
                };
            }
        }

        [HttpPost]
        [Route("add")]
        /**
         * Agrega por medio del API una orden a la base
         * Recibe un objeto order por medio del un JSON
         */
        public Object Post([FromBody] Order order)
        {
            bool ok = OrderData.Add(order);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Orden registrada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar la orden"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        /**
         * Actualiza por medio del API una orden a la base
         * Recibe un objeto order por medio del un JSON
         */
        public Object Put([FromBody] Order order, int id)
        {
            bool ok = OrderData.Edit(order, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Orden modificada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar la orden"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        /**
         * Elimina la orden que tenga el id dado
         */
        public Object Delete(int id)
        {
            bool ok = OrderData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Orden eliminada correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar la orden"
                };
            }
        }
    }
}