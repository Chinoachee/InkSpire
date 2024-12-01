using api.Models;

namespace api.Database
{
    public interface IStoryRepository
    {
        Task AddAsync(Story story);
        IEnumerable<Story> GetAllByAuthorIdAsync(Guid authorId);
    }
}
