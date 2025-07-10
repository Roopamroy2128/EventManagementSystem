using WebApplication1.Models.Entities;

namespace WebApplication1.Interface
{
    public interface IUserRepository
    {
        // for user filtration
        Task<IEnumerable<User>> GetUsersByRole(string role);

        // for the login
        Task<User> LoginAsync(string email, string password);

        // for signup
        Task<bool> IsEmailRegisteredAsync(string email);
        Task<int> RegisterUserAsync(SignupRequest request);

        Task<IEnumerable<UserWithEvents>> GetUsersWithAcceptedEventsAsync();

    }
}
