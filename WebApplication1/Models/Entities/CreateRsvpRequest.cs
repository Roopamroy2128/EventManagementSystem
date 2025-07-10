namespace WebApplication1.Models.Entities
{
    public class CreateRsvpRequest     // DTO - Data Transfer Object 
    {
        public int UserId { get; set; }     // ✅ Use int
        public int EventId { get; set; }    // ✅ Use int
        public string Status { get; set; } = string.Empty;
    }
}
