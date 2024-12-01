using api.Contracts.Users;

namespace api.Services.Users
{
    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
        Task<string> AuthorizeUser(AuthorizationUserRequest request);
        Guid GetUserId();
    }
}
