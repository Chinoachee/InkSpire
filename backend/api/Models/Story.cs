namespace api.Models
{
    public class Story
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string InitialText { get; set; }
        public Guid AuthorId { get; set; }
    }
}
