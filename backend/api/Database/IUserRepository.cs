using api.Models.Users;

namespace api.Database
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task AddAsync(User user);
        Task<User?> GetByLoginAsync(string login);
    }
}
