namespace api.Models.Stories
{
    public class StoryDto
    {
        public string Title { get; set; }
        public string InitialText { get; set; }
        public Guid AuthorId { get; set; }
    }
}
