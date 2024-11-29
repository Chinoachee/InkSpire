using api.Contracts.Users;
using api.Models;

namespace api.Services
{
    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
        Task<User?> AuthorizeUser(AuthorizationUserRequest request);
    }
}
