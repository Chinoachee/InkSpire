using api.Contracts.Users;

namespace api.Services
{
    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
    }
}
