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
    public object Get()
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
    public object Get(int id)
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
    public object Post([FromBody] StoreInfo storeData)
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
    [Route("update/{storeID}")]
    public object Put([FromBody] StoreInfo storeData, int storeID)
    {
      int managerID = StoreData.Get(storeID).managerID;

      bool managerOK = ManagerData.Edit(storeData.manager, managerID);
      bool storeOK = StoreData.Edit(storeData.store, storeID);
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
    public object Delete(int id)
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

    [HttpGet]
    [Route("get_applicants")]
    public object GetApplicants()
    {
      try
      {
        List<Store> stores = StoreData.GetApplicants();

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
  }
}