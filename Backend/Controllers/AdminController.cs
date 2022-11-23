using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("admin")]
    public class AdminController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        /**
         * Proporciona por medio del API la lista de administradores
         * 
         */
        public Object Get()
        {
            try
            {
                List<Admin> managers = AdminData.GetAll();
                return new
                {
                    status = "ok",
                    managers = managers
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
         * Proporciona por medio del API el administrador con el id dado
         * 
         */
        public Object Get(int id)
        {
            try
            {
                Admin manager = AdminData.Get(id);
                return new
                {
                    status = "ok",
                    manager = manager
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
         * Agrega por medio del API un administrador a la base
         * Recibe un objeto admin por medio del un JSON
         */
        public Object Post([FromBody] Admin admin)
        {
            bool ok = AdminData.Add(admin);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Administrador registrado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo registrar el administrador"
                };
            }
        }

        [HttpPatch]
        [Route("update/{id}")]
        /**
         * Actualiza por medio del API un administrador a la base
         * Recibe un objeto admin por medio del un JSON
         */
        public Object Put([FromBody] Admin admin, int id)
        {
            bool ok = AdminData.Edit(admin, id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Admin modificado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo modificar el admin"
                };
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        /**
         * Elimina el admin que tenga el id dado
         */
        public Object Delete(int id)
        {
            bool ok = AdminData.Delete(id);
            if (ok)
            {
                return new
                {
                    status = "ok",
                    message = "Administrador eliminado correctamente"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    message = "No se pudo eliminar el admininistrador"
                };
            }
        }
    }
}