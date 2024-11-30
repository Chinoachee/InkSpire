using api.Models;

namespace api.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);
    }
}
