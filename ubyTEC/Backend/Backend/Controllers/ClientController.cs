using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
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
                List<ClienteForGet> clientes = ClientData.Listar();
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
                ClienteForGet cliente = ClientData.Obtener(id);
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
        public Object Post([FromBody] Client cliente)
        {
            bool ok = ClientData.Registrar(cliente);
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
        public Object Put([FromBody] Client cliente)
        {
            bool ok = ClientData.Modificar(cliente);
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
        [Route("delete/{cedula}")]
        public Object Delete(int id)
        {
            bool ok = ClientData.Eliminar(id);
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
