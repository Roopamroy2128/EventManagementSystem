namespace WebApplication1.Models.Entities
{
    public class CreateEventRequest
    {
        // for event creation
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Location { get; set; }

        public string Category { get; set; }
    }
}
