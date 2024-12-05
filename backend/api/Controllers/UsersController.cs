using api.Contracts.Users;
using api.Exceptions;
using api.Models.Users;
using api.Services.Storys;
using api.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService userService, IStoryService storyService) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        private readonly IStoryService _storyService = storyService;

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] CreateUserRequest request)
        {
            try
            {
                await _userService.CreateUser(request);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(new { Message = e.Message });
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

        [HttpGet("/profile/{login}")]
        public async Task<IActionResult> GetUserProfile(string login)
        {
            try
            {
                var user = await _userService.GetByLogin(login);
                if (user == null)
                {
                    return NotFound();
                }
                var userStories = await _storyService.GetUserStory(user.Id);
                return Ok(new
                {
                    User = new UserProfileDto(user.Login),
                    Stories = userStories
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
