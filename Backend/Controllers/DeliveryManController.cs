using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("deliveryman")]
    public class DeliveryManController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public Object Get()
        {
            try
            {
                List<DeliveryMan> delmans = DeliveryManData.GetAll();
                return new
                {
                    status = "ok",
                    deliverymen = delmans
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
                DeliveryMan delman = DeliveryManData.Get(id);
                return new
                {
                    status = "ok",
                    deliveryman = delman
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
        public Object Post([FromBody] DeliveryMan delman)
        {
            bool ok = DeliveryManData.Add(delman);
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
        public Object Put([FromBody] DeliveryMan delman, int id)
        {
            bool ok = DeliveryManData.Edit(delman, id);
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
