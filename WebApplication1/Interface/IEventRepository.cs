using WebApplication1.Models.Entities;

namespace WebApplication1.Interface
{
    public interface IEventRepository
    {
        // event creation
        Task<int> CreateEventAsync(CreateEventRequest request);

        // eventlising
        Task<IEnumerable<Event>> GetAllEventsAsync();

        // event updation
        Task<bool> UpdateEventAsync(UpdateEventRequest request);

        // event deletion
        Task<bool> DeleteEventAsync(int eventId);

        // Event by id 
        Task<Event?> GetEventByIdAsync(int eventId);
    }
}
