using MongoDB.Driver;

namespace Backend.Data
{
    public class MongoDBData
    {
        public MongoClient client;
        public IMongoDatabase db;

        public MongoDBData()
        {
            client = new MongoClient("mongodb://localhost:27017");
            db = client.GetDatabase("UbyTec");
        }
    }
}
