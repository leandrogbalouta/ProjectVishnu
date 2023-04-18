using ProjectVishnu.Models;

namespace ProjectVishnu.Services;
public interface ITiposDeUserService
{
    TipoDeUser Get(string tipoDeUser);
    string Create(TipoDeUser conta);
    string Delete(string tipoDeUser);
    string Update(string tipoDeUser, TipoDeUser tipoDeUserEntity);
    IEnumerable<TipoDeUser> List();
}
