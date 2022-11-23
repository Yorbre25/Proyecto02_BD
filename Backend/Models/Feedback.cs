using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class Feedback
    {
        [BsonId]
        public ObjectId id{ get; set; }

        [BsonElement("idOrder")]
        public int idOrder { get; set; }

        [BsonElement("idClient")]
        public int idClient { get; set; }

        [BsonElement("storeReview")]
        public string storeReview { get; set; }

        [BsonElement("delmanReview")]
        public string delmanReview { get; set; } 
    }
}
