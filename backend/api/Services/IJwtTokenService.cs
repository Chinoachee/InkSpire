using api.Models.Users;

namespace api.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);
    }
}
