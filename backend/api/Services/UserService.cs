using api.Contracts.Users;
using api.Database;
using api.Models;

namespace api.Services
{
    public class UserService(IUserRepository repository, IHashPasswordService hashPasswordService) : IUserService
    {
        private readonly IUserRepository _repository = repository;
        private readonly IHashPasswordService _hashPasswordService = hashPasswordService;
        public async Task CreateUser(CreateUserRequest request)
        {
            if(await _repository.GetByEmailAsync(request.Email))
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
            await _repository.AddAsync(user);
        }
    }
}
