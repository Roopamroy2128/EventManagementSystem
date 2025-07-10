using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using WebApplication1.Interface;
using WebApplication1.Models.Entities;

namespace WebApplication1.Repo
{
    public class EventRepository : IEventRepository
    {
        private readonly IConfiguration _configuration;

        public EventRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
                                               
        private IDbConnection connection => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                                                // for event creation
        public async Task<int> CreateEventAsync(CreateEventRequest request)
        {
            var sql = @"INSERT INTO events (title, description, start_time, end_time, location, category)
                        VALUES (@Title, @Description, @StartTime, @EndTime, @Location, @Category);
                        SELECT SCOPE_IDENTITY();";

            using var db = connection;
            var eventId = await db.ExecuteScalarAsync<int>(sql, request);
            return eventId;
        }

                                                // for listing all events   
        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            var sql = @"SELECT 
                    event_id AS EventId,
                    title,
                    description,
                    start_time AS StartTime,
                    end_time AS EndTime,
                    location,
                    category
                FROM events";
            using var db = connection;
            return await db.QueryAsync<Event>(sql);
        }


                                                // for event updation
        public async Task<bool> UpdateEventAsync(UpdateEventRequest request)
        {
            var sql = @"UPDATE events
                        SET title = @Title,
                            description = @Description,
                            start_time = @StartTime,
                            end_time = @EndTime,
                            location = @Location,
                            category = @Category
                            WHERE event_id = @EventId";

            using var db = connection;
            var rows = await db.ExecuteAsync(sql, request);
            return rows > 0;
        }

                                                // for event deletion
        public async Task<bool> DeleteEventAsync(int eventId)
        {
            var sql = "DELETE FROM events WHERE event_id = @EventId";
            using var db = connection;
            var rows = await db.ExecuteAsync(sql, new { EventId =  eventId });
            return rows > 0;
        }
            
                                                    // Event by id
        public async Task<Event?> GetEventByIdAsync(int eventId)
        {
            var sql = "SELECT * FROM events WHERE event_id = @EventId";
            using var db = connection;
            return await db.QueryFirstOrDefaultAsync<Event>(sql, new { EventId = eventId });
        }
    }
}
