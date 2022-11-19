using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("store_type")]
  public class StoreTypeController : Controller
  {
    [HttpGet]
    [Route("get_all")]
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