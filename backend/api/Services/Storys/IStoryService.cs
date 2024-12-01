using api.Contracts.Storys;

namespace api.Services.Storys
{
    public interface IStoryService
    {
        Task CreateStory(CreateStoryRequest request, Guid authorId);
    }
}
