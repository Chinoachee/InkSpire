using System.Security.Principal;
using api.Contracts.Users;
using api.Exceptions;
using api.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] CreateUserRequest request)
        {
            try
            {
                await _userService.CreateUser(request);
                return Ok();
            }
            catch (InvalidOperationException)
            {
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Произошла ошибка на сервере", Details = ex.Message });
            }
        }

        [HttpPost("authorization")]
        public async Task<IActionResult> Authorization([FromBody] AuthorizationUserRequest request)
        {
            try
            {
                var token = await _userService.AuthorizeUser(request);
                return Ok(new { Message = "Успешная авторизация", Token = token });
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Неправильный логин или пароль");
            }
            catch (InvalidPasswordException)
            {
                return BadRequest("Неправильный логин или пароль");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Произошла ошибка на сервере", Details = ex.Message });
            }
        }
    }
}
