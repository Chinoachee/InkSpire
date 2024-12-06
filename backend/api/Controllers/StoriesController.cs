using api.Contracts.Storys;
using api.Exceptions;
using api.Services.Storys;
using api.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController(IStoryService storyService, IUserService userService) : ControllerBase
    {
        private readonly IStoryService _storyService = storyService;
        private readonly IUserService _userService = userService;


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateStory(CreateStoryRequest request)
        {
            try
            {
                var userId = _userService.GetUserId();

                await _storyService.CreateStory(request, userId);

                return Ok(new { Message = "Story created successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetStory(Guid storyId)
        {
            try
            {
                var response = await _storyService.GetStory(storyId);
                return Ok(response);
            }
            catch (StoryNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
