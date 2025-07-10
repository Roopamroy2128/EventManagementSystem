using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interface;
using WebApplication1.Repo;

var builder = WebApplication.CreateBuilder(args);


// registering dapper repository
// Assuming UserRepository is a class that implements IUserRepository
builder.Services.AddScoped<IUserRepository, UserRepository>();


// Assuming EventRepository is a class that implements IEventRepository 
// tells .NET Core's built in (DI) container: Whenever a class needs IEventRepository, give it an instance of EventRepository
builder.Services.AddScoped<IEventRepository, EventRepository>();


// tells .NET Core's built in (DI) container: Whenever a class needs IRsvpRepository, give it an instance of RsvpRepository
builder.Services.AddScoped<IRsvpRepository, RsvpRepository>();


// Add services to the container.
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// injecting ApplicationDbContext class to use inside the controller or any class in the application
builder.Services.AddDbContext<ApplicationDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular app origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers(); // or builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularDevClient");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
