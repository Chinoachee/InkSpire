using api.Contracts.Users;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("create")]
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
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { Message = "Работает!", Timestamp = DateTime.UtcNow });
        }
    }
}
