using api.Contracts.Storys;
using api.Database;
using api.Models.Stories;

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

        public async Task<IEnumerable<StoryProfileDto>> GetUserStory(Guid authorId)
        {
            var result = await _storyRepository.GetAllByAuthorIdAsync(authorId);
            return result.Select(s => new StoryProfileDto(s.Id, s.Title));
        }
    }
}
