using api.Contracts.Users;
using api.Models.Users;

namespace api.Services.Users
{
    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
        Task<string> AuthorizeUser(AuthorizationUserRequest request);
        Task<User?> GetByLogin(string login);
        Guid GetUserId();
    }
}
