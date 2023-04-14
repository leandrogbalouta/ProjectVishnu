using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services;
public interface IContaService
{
    Conta Get(string username);
    string Create(ContaInputModel conta);
    string Delete(string username);
    string Update(string username, Conta conta);
}