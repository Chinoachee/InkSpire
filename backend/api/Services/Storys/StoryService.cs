using api.Contracts.Storys;
using api.Database;
using api.Models;

namespace api.Services.Storys
{
    public class StoryService(IStoryRepository storyRepository) : IStoryService
    {
        private readonly IStoryRepository _storyRepository = storyRepository;
        public async Task CreateStory(CreateStoryRequest request, Guid authorId)
        {
            var story = new Story()
            {
                Title = request.Title,
                InitialText = request.InitialText,
                AuthorId = authorId
            };
            await _storyRepository.AddAsync(story);
        }
    }
}
