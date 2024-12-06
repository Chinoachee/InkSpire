using api.Contracts.Storys;
using api.Models.Stories;

namespace api.Services.Storys
{
    public interface IStoryService
    {
        Task CreateStory(CreateStoryRequest request, Guid authorId);
        Task<IEnumerable<StoryProfileDto>> GetUserStory(Guid authorId);
        Task<StoryDto> GetStory(Guid id);
    }
}
