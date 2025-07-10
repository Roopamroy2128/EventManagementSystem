using WebApplication1.Models.Entities;

namespace WebApplication1.Interface
{
    public interface IRsvpRepository     
    {
        Task<bool> CreateRsvpAsync(CreateRsvpRequest request);    // for filtering attends


        Task<bool> UpdateRsvpStatusAsync(int userId, int eventId, string status);   // for updating

        Task<IEnumerable<int>> GetAcceptedEventIdsForUserAsync(int userId);

        Task<bool> DeleteRsvpAsync(int userId, int eventId);

    }
}
