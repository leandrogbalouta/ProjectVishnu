using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.DataAccess.Repository;
using ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete;
using ProjectVishnu.ServerApp.App.Services;
using ProjectVishnu.ServerApp.App.Services.Concrete;
using ProjectVishnu.Services;
using ProjectVishnu.Services.Concrete;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// test db azure
// string isAzure = builder.Configuration.GetSection("Azure").Value ?? "false";
// if(isAzure.Equals("True")) {
//     builder.Services.AddDbContext<vishnuContext>(options =>
//             options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("vishnuAzure") ?? ""));
// }
// else {
//     builder.Services.AddDbContext<vishnuContext>(options =>
//                 options.UseLazyLoadingProxies().UseNpgsql(builder.Configuration.GetConnectionString("vishnu")));
// }
builder.Services.AddDbContext<vishnuContext>(options =>
           options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("vishnuAzure") ?? ""));
builder.Services.AddScoped<DbContext, vishnuContext>();
builder.Services.AddSingleton(provider => builder.Configuration);
builder.Services.AddScoped<IFuncionarioRepository, FuncionarioRepository>();
builder.Services.AddScoped<IObraRepository, ObraRepository>();
builder.Services.AddScoped<ICategoriaProfRepository, CategoriaProfRepository>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IFuncionariosService, FuncionariosService>();
builder.Services.AddScoped<IObrasService, ObrasService>();
builder.Services.AddScoped<IFolhaDePontoService, FolhaDePontoService>();
builder.Services.AddScoped<IMercadosService, MercadosService>();
builder.Services.AddScoped<ICategoriaProfService, CategoriaProfService>();
builder.Services.AddScoped<ITiposDocService, TiposDocService>();

builder.Services.AddControllersWithViews();



var app = builder.Build();

// app.UsePathBase("/api"); // isto pelos vistos adiciona um basepath a qualquer request ao servidor.. 
// isto funciona para uma simples api, mas para uma webapp nao
// quer dizer que se fizers request a www.a.com/funcionarios ele automaticamente mete o basepath ao request, sendo www.a.com/api/funcionarios
// nao tenho a certeza mas parece ser isso :)
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