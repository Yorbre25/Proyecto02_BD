using Backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Data
{
    public class FeedbackCollection : IFeedbackCollection
    {
        internal MongoDBData _db = new MongoDBData();
        private IMongoCollection<Feedback> Collection;

        public FeedbackCollection()
        {
            Collection = _db.db.GetCollection<Feedback>("feedback");
        }
        public async Task DeleteFeedback(int id)
        {
            var filter = Builders<Feedback>.Filter.Eq(s => s.idOrder, id);
            await Collection.DeleteOneAsync(filter);
        }

        public async Task<List<Feedback>> GetAllFeedbacks()
        {
            return await Collection.FindAsync(new BsonDocument()).Result.ToListAsync();
        }

        public async Task<Feedback> GetFeedback(int id)
        {
            return await Collection.FindAsync(new BsonDocument { { "idOrder", id} }).Result.FirstAsync();
        }

        public async Task InsertFeedback(Feedback feedback)
        {
            await Collection.InsertOneAsync(feedback);
        }

        public async Task UpdateFeedback(Feedback feedback)
        {
            var filter = Builders<Feedback>.Filter.Eq(s => s.idOrder,feedback.idOrder);
            await Collection.ReplaceOneAsync(filter, feedback);

        }
    }
}
