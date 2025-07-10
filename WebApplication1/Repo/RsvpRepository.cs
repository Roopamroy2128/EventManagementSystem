using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Repo
{
    public class RsvpRepository : IRsvpRepository
    {
        private readonly IConfiguration _configuration;

        public RsvpRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection connection => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        public async Task<bool> CreateRsvpAsync(CreateRsvpRequest request)  // for filtering attendes
        {
            var sql = @"INSERT INTO rsvps (user_id, event_id, status)
                        VALUES (@UserId, @EventId, @Status)";

            using var db = connection;
            var rows = await db.ExecuteAsync(sql, request);
            return rows > 0;
                         
        }


        public async Task<bool> UpdateRsvpStatusAsync(int userId, int eventId, string status)
        {
            var sql = @"UPDATE rsvps
                        SET status = @Status
                        WHERE user_id = @UserId AND event_id = @EventId";

            using var db = connection;
            var rows = await db.ExecuteAsync(sql, new { UserId = userId, EventId = eventId, Status = status });

            return rows > 0;
        }

        public async Task<IEnumerable<int>> GetAcceptedEventIdsForUserAsync(int userId)
        {
            var sql = @"SELECT event_id FROM rsvps
                WHERE user_id = @UserId AND status = 'Attending'";

            using var db = connection;
            var result = await db.QueryAsync<int>(sql, new { UserId = userId });
            return result;
        }
        public async Task<bool> DeleteRsvpAsync(int userId, int eventId)
        {
            var sql = @"DELETE FROM rsvps WHERE user_id = @UserId AND event_id = @EventId";

            using var db = connection;
            var rows = await db.ExecuteAsync(sql, new { UserId = userId, EventId = eventId });

            return rows > 0;
        }


    }
}
