using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RsvpController : Controller
    {
        private readonly IRsvpRepository _repository;

        public RsvpController(IRsvpRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("attendes")]
        public async Task<IActionResult> CreateRsvp([FromBody] CreateRsvpRequest request)
        {
            if (request.Status != "Attending" &&  request.Status != "Not Attending")
            {
                return BadRequest("Status must be 'Attending' or 'Not Attending'");
            }

            var success = await _repository.CreateRsvpAsync(request);

            if (!success)
                return StatusCode(500, "Failed to create RSVP");

            return Ok(new { message = "RSVP submitted successfully" });
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateRsvpStatus(
            [FromQuery] int userId, [FromQuery] int eventId, [FromQuery] string status)
        {
            if (status != "Attending" && status != "Not Attending")
            {
                return BadRequest("Status must be 'Attending' or 'Not Attending'");
            }

            var updated = await _repository.UpdateRsvpStatusAsync(userId, eventId, status);

            if (!updated)
                return NotFound(new { message = "RSVP not found for given user and event" });

            return Ok(new { message = "RSVP status updated successfully" });

        }

        [HttpGet("accepted")]
        public async Task<IActionResult> GetAcceptedEventsForUser([FromQuery] int userId)
        {
            var eventIds = await _repository.GetAcceptedEventIdsForUserAsync(userId);
            return Ok(eventIds); // Returns: [1, 3, 7, ...]
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteRsvp([FromQuery] int userId, [FromQuery] int eventId)
        {
            var deleted = await _repository.DeleteRsvpAsync(userId, eventId);

            if (!deleted)
                return NotFound(new { message = "RSVP not found for given user and event" });

            return Ok(new { message = "RSVP deleted successfully" });
        }
    }
}
