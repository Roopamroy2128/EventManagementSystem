using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Interface;

namespace WebApplication1.Controllers
{
    // localhost:xxxx/api/Users      [Users -name of controller/ auto maped by  [Route("api/[controller]")]]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /*
        private readonly ApplicationDbContext dbContext;

        // injecting the DbContext to access the database

        
        public UsersController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        */
        private readonly ApplicationDbContext dbContext;
        private readonly IUserRepository _userRepository;

        public UsersController(ApplicationDbContext dbContext, IUserRepository userRepository)
        {
            this.dbContext = dbContext;
            _userRepository = userRepository;
        }



        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = dbContext.Users.ToList();
            return Ok(allUsers);
        }
        

        /*
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        */

        [HttpGet("filter")]
        public async Task<IActionResult> GetUsersByRole(string role)
        {
            if (role != "Admin" && role != "User")
                return BadRequest("Role must be 'Admin' or 'User'");

            var users = await _userRepository.GetUsersByRole(role);
            return Ok(users);
           
        }

        [HttpGet("with-accepted-events")]
        public async Task<IActionResult> GetUsersWithAcceptedEvents()
        {
            var users = await _userRepository.GetUsersWithAcceptedEventsAsync();
            return Ok(users);
        }
    }
}
