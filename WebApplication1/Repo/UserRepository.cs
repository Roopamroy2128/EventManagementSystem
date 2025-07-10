using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private IDbConnection connection => new SqlConnection(_connectionString);

                                         // for filtration
        public async Task<IEnumerable<User>> GetUsersByRole(string role)
        {
            var sql = "SELECT * FROM users WHERE role = @Role";
            using var db = connection;
            return await db.QueryAsync<User>(sql, new {Role = role });
        }
                                        // for login
         public async Task<User> LoginAsync(string email, string password)
        {
            var sql = "SELECT * FROM users WHERE email = @Email AND password = @Password ";
            using var db = connection;
            return await db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email, Password = password });
        }
                                        // FOR SIGNUP
        public async Task<bool> IsEmailRegisteredAsync(string email)
        {
            var sql = "SELECT COUNT(1) FROM users WHERE email = @Email";
            using var db = connection;
            var count = await db.ExecuteScalarAsync<int>(sql, new { Email = email });
            return count > 0;
        }
        public async Task<int> RegisterUserAsync(SignupRequest request)
        {
            var sql = @"INSERT INTO users (first_name, last_name, email, phone_number, password, role)
                VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @Password, @Role)";
            using var db = connection;
            return await db.ExecuteAsync(sql, request);
        }

        public async Task<IEnumerable<UserWithEvents>> GetUsersWithAcceptedEventsAsync()
        {
            var sql = @"
        SELECT 
            u.id,
            u.first_name AS First_Name,
            u.last_name AS Last_Name,
            u.email AS Email,
            u.phone_number AS Phone_Number,
            e.event_id AS EventId,
            e.title AS Title,
            e.start_time AS StartTime
        FROM users u
        INNER JOIN rsvps r ON u.id = r.user_id AND r.status = 'Attending'
        INNER JOIN events e ON r.event_id = e.event_id
        WHERE u.role = 'User'";

            var userDict = new Dictionary<int, UserWithEvents>();

            using var db = connection;
            var result = await db.QueryAsync<UserWithEvents, EventDto, UserWithEvents>(
                sql,
                (user, evt) =>
                {
                    if (!userDict.TryGetValue(user.id, out var currentUser))
                    {
                        currentUser = user;
                        currentUser.Events = new List<EventDto>();
                        userDict.Add(user.id, currentUser);
                    }

                    if (evt != null)
                        currentUser.Events.Add(evt);

                    return currentUser;
                },
                splitOn: "EventId"
            );

            return userDict.Values;
        }


    }
}
