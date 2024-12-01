using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using api.Contracts.Users;
using api.Database;
using api.Exceptions;
using api.Models;

namespace api.Services.Users
{
    public class UserService(IUserRepository userRepository,
                             IHashPasswordService hashPasswordService,
                             IJwtTokenService jwtTokenService,
                             IHttpContextAccessor httpContextAccessor) : IUserService
    {

        private readonly IJwtTokenService _jwtTokenService = jwtTokenService;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IHashPasswordService _hashPasswordService = hashPasswordService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public async Task CreateUser(CreateUserRequest request)
        {
            if (await _userRepository.GetByEmailAsync(request.Email) != null)
            {
                throw new InvalidOperationException("Пользователь с таким email уже существует");
            }

            var hashPassword = _hashPasswordService.Hash(request.Password);

            var user = new User()
            {
                Login = request.Login,
                Email = request.Email,
                HashPassword = hashPassword
            };
            await _userRepository.AddAsync(user);
        }
        public async Task<string> AuthorizeUser(AuthorizationUserRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null)
            {
                throw new InvalidOperationException();
            }

            if (!_hashPasswordService.Verify(request.Password, user.HashPassword))
            {
                throw new InvalidPasswordException();
            }

            return _jwtTokenService.GenerateToken(user);
        }

        public Guid GetUserId()
        {
            var userClaims = _httpContextAccessor.HttpContext?.User;

            if (userClaims == null || !userClaims.Identity?.IsAuthenticated == true)
            {
                Console.WriteLine("User not authenticated");
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            // Попытка получить идентификатор пользователя из клейма 'sub'
            var userIdClaim = userClaims.FindFirst(JwtRegisteredClaimNames.Sub)
                              ?? userClaims.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                Console.WriteLine("Claim `sub` or `nameidentifier` not found or invalid");
                throw new InvalidOperationException("User ID not found or invalid.");
            }

            return userId;
        }

    }
}
