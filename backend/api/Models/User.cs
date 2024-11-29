namespace api.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string HashPassword { get; set; }
        public string Email { get; set; }
    }
}
