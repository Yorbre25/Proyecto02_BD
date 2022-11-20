using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("client")]
    public class ClientController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public Object Get()
        {
            try
            {
                List<Client> clientes = ClientData.GetAll();
                return new
                {
                    status = "ok",
                    clients = clientes
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
                Client cliente = ClientData.Get(id);
                return new
                {
                    status = "ok",
                    client = cliente
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
        public Object Post([FromBody] Client client)
        {
            bool ok = ClientData.Add(client);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Cliente registrado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar el cliente"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        public Object Put([FromBody] Client client, int id)
        {
            bool ok = ClientData.Edit(client, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Cliente modificado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar el cliente"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public Object Delete(int id)
        {
            bool ok = ClientData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Cliente eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar el cliente"
                };
            }
        }
    }
}
