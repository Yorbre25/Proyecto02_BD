using MongoDB.Driver;

namespace Backend.Data
{
    public class MongoDBData
    {
        public MongoClient client;
        public IMongoDatabase db;

        public MongoDBData()
        {
            client = new MongoClient("mongodb://ubyfeedback:LwnTBmV1vA8OA4TBMnoPluz1fiWVhW4Ca8mpN3TuqdRapt9dvhiym7LEpUUvPbKuVp9wKFBzLYijACDbzQbVUw==@ubyfeedback.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ubyfeedback@");
            db = client.GetDatabase("UbyTec");
        }
    }
}
