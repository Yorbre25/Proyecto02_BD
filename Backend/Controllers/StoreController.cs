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
        List<Store> stores = StoreData.GetAll();

        List<object> storesData = new List<object>();
        foreach (Store storeData in stores)
        {
          storesData.Add(new
          {
            store = storeData,
            manager = ManagerData.Get(storeData.managerID)
          });
        }

        return new
        {
          status = "ok",
          storesData = storesData
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
        Store store = StoreData.Get(id);
        object storeData = new
        {
          store = store,
          manager = ManagerData.Get(store.managerID)
        };

        return new
        {
          status = "ok",
          storeData = storeData
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
    public Object Post([FromBody] StoreInfo storeData)
    {
      bool managerOK = ManagerData.Add(storeData.manager);
      bool storeOK = StoreData.Add(storeData.store);
      if (storeOK && managerOK)
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
    public Object Put([FromBody] StoreInfo storeData, int storeID)
    {
      int managerID = StoreData.Get(storeID).managerID;

      bool storeOK = StoreData.Edit(storeData.store, storeID);
      bool managerOK = ManagerData.Edit(storeData.manager, managerID);
      if (storeOK && managerOK)
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
      int managerID = StoreData.Get(id).managerID;

      bool storeOK = StoreData.Delete(id);
      bool managerOK = ManagerData.Delete(managerID);
      if (managerOK && storeOK)
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