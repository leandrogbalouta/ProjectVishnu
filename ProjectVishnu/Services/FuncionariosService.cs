using ProjectVishnu.Models;
using ProjectVishnu.Repository;

namespace ProjectVishnu.Services
{
    public class FuncionariosService
    {
        private FuncionarioRepository _funcionarioRepository;
        public FuncionariosService()
        {
            this._funcionarioRepository = new FuncionarioRepository();
        }
        public String ListByMarket(string mercado)
        {
            if (string.Equals(mercado, "franca") || string.Equals(mercado, "espanha") || string.Equals(mercado, "portugal"))
            {
                return _funcionarioRepository.listByMarket(mercado);
            }
            return "Mercado inválido";
        }

        public Funcionario ListAlphabetically() 
        {
            return _funcionarioRepository.listAlphabetically();
        }

        public string Get(int id)
        {   
            return _funcionarioRepository.Get(id);
        }

    }
}
