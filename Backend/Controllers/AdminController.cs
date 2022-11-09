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

    //         [HttpPost]
    //         [Route("add")]
    //         public Object Post([FromBody] Admin cliente)
    //         {
    //             bool ok = AdminData.Registrar(cliente);
    //             if (ok)
    //             {
    //                 return new
    //                 {
    //                     status = "ok",
    //                     message = "Admine registrado correctamente"
    //                 };
    //             }
    //             else
    //             {
    //                 return new
    //                 {
    //                     status = "error",
    //                     message = "No se pudo registrar el cliente"
    //                 };
    //             }
    //         }

    //         [HttpPatch]
    //         [Route("update/{id}")]
    //         public Object Put([FromBody] Admin cliente)
    //         {
    //             bool ok = AdminData.Modificar(cliente);
    //             if (ok)
    //             {
    //                 return new
    //                 {
    //                     status = "ok",
    //                     message = "Admine modificado correctamente"
    //                 };
    //             }
    //             else
    //             {
    //                 return new
    //                 {
    //                     status = "error",
    //                     message = "No se pudo modificar el cliente"
    //                 };
    //             }
    //         }

    //         [HttpDelete]
    //         [Route("delete/{cedula}")]
    //         public Object Delete(int id)
    //         {
    //             bool ok = AdminData.Eliminar(id);
    //             if (ok)
    //             {
    //                 return new
    //                 {
    //                     status = "ok",
    //                     message = "Admine eliminado correctamente"
    //                 };
    //             }
    //             else
    //             {
    //                 return new
    //                 {
    //                     status = "error",
    //                     message = "No se pudo eliminar el cliente"
    //                 };
    //             }
    //         }

    //     }
  }
}
