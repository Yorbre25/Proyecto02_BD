using Backend.Models;

namespace Backend.Data
{
    public interface IFeedbackCollection
    {
        Task InsertFeedback(Feedback feedback);
        Task UpdateFeedback(Feedback feedback);
        Task DeleteFeedback(int id);

        Task<Feedback> GetFeedback(int id);

        Task<List<Feedback>> GetAllFeedbacks();

    }
}
