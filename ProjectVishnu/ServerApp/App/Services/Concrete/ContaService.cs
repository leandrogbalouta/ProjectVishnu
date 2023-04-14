using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services.Concrete;
public class ContaService : IContaService
{
    private readonly IUnitOfWork _unitOfWork;
    public ContaService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public string Create(ContaInputModel conta)
    {
        throw new NotImplementedException();
    }

    public string Delete(string username)
    {
        throw new NotImplementedException();
    }

    public Conta Get(string username)
    {
        return _unitOfWork.Contas.Get(username);
    }

    public string Update(string username, Conta conta)
    {
        throw new NotImplementedException();
    }
}