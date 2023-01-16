
using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.ServerApp.App.Services;
using ProjectVishnu.ServerApp.App.Services.Concrete;
using ProjectVishnu.Services;
using ProjectVishnu.Services.Concrete;

namespace ProjectVishnu;
internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<vishnuContext>(options =>
                    options.UseLazyLoadingProxies().UseNpgsql(builder.Configuration.GetConnectionString("vishnu")));
        builder.Services.AddScoped<DbContext, vishnuContext>();
        builder.Services.AddSingleton(provider => builder.Configuration);
        builder.Services.AddScoped<IFuncionarioRepository, FuncionarioRepository>();
        builder.Services.AddScoped<IObraRepository, ObraRepository>();
        builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.AddScoped<IFuncionariosService, FuncionariosService>();
        builder.Services.AddScoped<IObrasService, ObrasService>();
        builder.Services.AddScoped<IFolhaDePontoService, FolhaDePontoService>();
        builder.Services.AddScoped<IMercadosService, MercadosService>();

        builder.Services.AddControllersWithViews();


        builder.Services.AddControllers();
        builder.Services.AddCors();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }
        app.UseCors(p => p.WithOrigins("http://localhost:3000"));
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action}/{id?}");
            
        app.MapFallbackToFile("index.html");

        app.Run();
    }
}