using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("stores")]
  public class StoreController : Controller
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<Store> storesData = StoreData.GetAll();

        List<object> stores = new List<object>();
        foreach (Store storeData in storesData)
        {
          stores.Add(new
          {
            status = "ok",
            store = storeData,
            manager = ManagerData.Get(storeData.managerID)
          });
        }

        return stores;
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
        Store storeData = StoreData.Get(id);

        return new
        {
          status = "ok",
          store = storeData,
          manager = ManagerData.Get(storeData.managerID)
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
    public Object Post([FromBody] Store store)
    {
      bool ok = StoreData.Add(store);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Afiliado registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el afiliado"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Store store, int id)
    {
      bool ok = StoreData.Edit(store, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Afiliado modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el afiliado"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(int id)
    {
      bool ok = StoreData.Delete(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Afiliado eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el afiliado"
        };
      }
    }
  }
}