using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Common;
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
        try{
            string hashy = PasswordCrypto.Hash(conta.Password);

            int TipoDeUserId = _unitOfWork.TiposDeUser.GetByType(conta.TipoDeUser);

            Conta contaToAdd = new Conta 
            {
                Username = conta.Username,
                PasswordHash = hashy,
                TipoDeUserId = TipoDeUserId
            };
            _unitOfWork.Contas.Add(contaToAdd);
            _unitOfWork.Complete();
            return conta.Username;
        }catch(Exception ex){
            throw ex;
        }
        
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