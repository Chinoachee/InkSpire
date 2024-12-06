using api.Models.Stories;

namespace api.Database
{
    public interface IStoryRepository
    {
        Task AddAsync(Story story);
        Task<IEnumerable<Story>> GetAllByAuthorIdAsync(Guid authorId);
        Task<Story?> GetStoryById(Guid id);
    }
}
