using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Entities;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        // property that's going to add in the database [means storing user in db]
        public DbSet<User> Users { get; set; }

       // public DbSet<CreateEventRequest> Events { get; set; }
       // only requires when using EF Core not in dapper
    }
}
 ////            When using dapper in full project we don't require this ApplicationDbContext file at all