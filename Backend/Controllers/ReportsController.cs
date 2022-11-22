using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("reports")]
  public class ReportsController : Controller
  {
    [HttpGet]
    [Route("sales_per_client")]
    public Object GetSalesPerClient()
    {
      try
      {
        List<SalePerClient> salesPerClient = ReportData.GetSalesPerClient();
        return new
        {
          status = "ok",
          report = salesPerClient
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
    [Route("sales_per_store")]
    public Object GetSalesPerStore()
    {
      try
      {
        List<SalePerStore> salesPerStore = ReportData.GetSalesPerStore();
        return new
        {
          status = "ok",
          report = salesPerStore
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