//using Microsoft.AspNetCore.Identity.Data;    [this line restricted so the commented line in Login can be used]
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(WebApplication1.Models.Entities.LoginRequest request) /*[FromBody] LoginRequest request -- we created this class but Asp.Net Core(via Identity) already includes - leading to namespace collision*/
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Email and Password are required.");

            var user = await _userRepository.LoginAsync(request.Email, request.Password);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            return Ok(user);
        }

        // for signup
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Email and Password are required");

            bool exists = await _userRepository.IsEmailRegisteredAsync(request.Email);
            if (exists)
                return Conflict("User with this email already exists.");

            var result = await _userRepository.RegisterUserAsync(request);
            if (result > 0)
                return Ok("User Registerd successfully.");
            else
                return StatusCode(500, "Something went wrong.");

        }
    }
}
