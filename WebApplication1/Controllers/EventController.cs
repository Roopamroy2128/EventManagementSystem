using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class EventController : Controller
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpPost("create")]     // for creation
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Description))
                return BadRequest("Title and description are required.");

            if (request.Category != "Virtual" && request.Category != "Onsite")
                return BadRequest("Category must be either 'Virtual' or 'Onsite'.");

            var eventId = await _eventRepository.CreateEventAsync(request);

            return Ok(new { Message = "Event created successfully", EventId = eventId });
        }


        [HttpGet("eventlist")]   // for listing
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventRepository.GetAllEventsAsync();
            return Ok(events);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateEvent([FromBody] UpdateEventRequest request)
        {
            Console.WriteLine($"Updating EventId: {request.EventId}"); // debug log
            var updated = await _eventRepository.UpdateEventAsync(request);
            if (!updated)
                return NotFound(new { message = "Event not found or not updated" });

            return Ok(new { message = "Event updated successfully" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvents(int id)
        {
            var deleted = await _eventRepository.DeleteEventAsync(id);

            if (!deleted)
                return NotFound(new { message = "Event not found or already deleted" });

            return Ok(new { message = "Event deleted successfully" });

        }


        [HttpGet("event/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var ev = await _eventRepository.GetEventByIdAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }

    }
}