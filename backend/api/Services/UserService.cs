using api.Contracts.Users;
using api.Database;
using api.Exceptions;
using api.Models;

namespace api.Services
{
    public class UserService(IUserRepository userRepository,
                             IHashPasswordService hashPasswordService,
                             IJwtTokenService jwtTokenService) : IUserService
    {
        private readonly IJwtTokenService _jwtTokenService = jwtTokenService;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IHashPasswordService _hashPasswordService = hashPasswordService;
        public async Task CreateUser(CreateUserRequest request)
        {
            if(await _userRepository.GetByEmailAsync(request.Email) != null)
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
        // Заменить на токен
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
    }
}
