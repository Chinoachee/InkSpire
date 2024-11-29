using api.Models;

namespace api.Database
{
    public interface IUserRepository
    {
        Task<bool> GetByEmailAsync(string email);
        Task AddAsync(User user);
    }
}
