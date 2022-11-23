using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using MongoDB.Bson;

namespace Backend.Controllers
{
    [ApiController]
    [Route("feedback")]
    public class FeedbackController : Controller
    {
        private IFeedbackCollection db = new FeedbackCollection();

        [HttpGet]
        [Route("get_all/{id}")]
        public Object GetAll(int id)
        {
            try
            {
                return new
                {
                    status = "ok",
                    reviews = db.GetAllFeedbacks(id).Result
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
                return new
                {
                    status = "ok",
                    review = db.GetFeedback(id).Result
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
        public Object Add([FromBody] Feedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest();

            }

            db.InsertFeedback(feedback);
            return new
            {
                status = "ok",
                message = "Reseña creada correctamente"
            };
        }

        [HttpDelete]
        [Route("delete/{id}")]

        public Object Delete(int id)
        {
            db.DeleteFeedback(id);
            return new
            {
                status = "ok",
                message = "Reseña eliminada correctamente"
            };
        }

    }
}
