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
        /**
        * Proporciona por medio del API la lista de reseñas segun el id de un cliente
        * 
        */
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
        /**
         * Proporciona por medio del API una reseña con el id de la orden dado
         * 
         */
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
        /**
         * Agrega por medio del API una reseña a la base
         * Recibe un objeto feedback por medio del un JSON
         */
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
        /**
         * Elimina la reseña que tenga el id dado
         */
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
