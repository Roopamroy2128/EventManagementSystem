using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string first_name { get; set; }
        
        [Required]
        public string last_name { get; set; }

        [EmailAddress]
        public string email { get; set; }

        public required string password { get; set; }

        [Phone]
        public string? phone_number { get; set; }

        public required string role { get; set; }

    }
    public class UserWithEvents
    {
        public int id { get; set; }
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone_Number { get; set; } = string.Empty;
        public List<EventDto> Events { get; set; } = new();
    }

    public class EventDto
    {
        public int EventId { get; set; } // ✅ needed for deletion
        public string Title { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
    }

}
