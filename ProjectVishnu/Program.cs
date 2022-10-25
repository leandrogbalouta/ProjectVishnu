
using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using ProjectVishnu.Services;

namespace ProjectVishnu
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<vishnuContext>(options =>
                        options.UseNpgsql(builder.Configuration.GetConnectionString("vishnu")));
            builder.Services.AddScoped<IFuncionarioRepository, FuncionarioRepository>();
            builder.Services.AddScoped<IObraRepository, ObraRepository>();
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IFuncionariosService, FuncionariosService>();

            builder.Services.AddControllersWithViews();

            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();


            app.MapControllers();

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}