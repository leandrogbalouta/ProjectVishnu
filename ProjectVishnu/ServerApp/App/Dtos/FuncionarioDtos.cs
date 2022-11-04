using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class FuncionarioInputModel
    {
        public string Nome { get; set; } = null!;
        public string? Dtnascimento { get; set; }
        public string Telemovel { get; set; } = null!;
        public string Contactoemergencia { get; set; } = null!;
        public string Nacionalidade { get; set; } = null!;
        public string Mercado { get; set; } = null!;
        public string Tipodocident { get; set; } = null!;
        public string Docident { get; set; } = null!;
        public string? Tituloresidencia { get; set; }
        public string? Manifestacaointeresse { get; set; }
        public string? Validadedocident { get; set; }
        public string Catprof { get; set; } = null!;
        public string Nif { get; set; } = null!;
        public string Niss { get; set; } = null!;
        public string Morada { get; set; } = null!;
        public string? Contratoinicio { get; set; }
        public string? Contratofim { get; set; }
        public decimal Vencimentobase { get; set; }
        public string Tiposalario { get; set; } = null!;
        public decimal Salarioreal { get; set; }
        public decimal? Calcado { get; set; }
        public string Cartaconducao { get; set; } = null!;
        public string Iban { get; set; } = null!;

        public Funcionario ToFuncionario()
        {
            Funcionario funcionario = new Funcionario();
            funcionario.Nome = Nome;
            funcionario.Dtnascimento = DateOnly.Parse(Dtnascimento);
            funcionario.Telemovel = Telemovel;
            funcionario.Contactoemergencia = Contactoemergencia;
            funcionario.Nacionalidade = Nacionalidade;
            funcionario.Mercado = Mercado;
            funcionario.Tipodocident = Tipodocident;
            funcionario.Docident = Docident;
            funcionario.Tituloresidencia = Tituloresidencia;
            funcionario.Manifestacaointeresse = Manifestacaointeresse;
            funcionario.Validadedocident = DateOnly.Parse(Validadedocident);
            funcionario.Catprof = Catprof;
            funcionario.Nif = Nif;
            funcionario.Niss = Niss;
            funcionario.Morada = Morada;
            funcionario.Contratoinicio = DateOnly.Parse(Contratoinicio);
            funcionario.Contratofim = DateOnly.Parse(Contratofim);
            funcionario.Vencimentobase = Vencimentobase;
            funcionario.Tiposalario = Tiposalario;
            funcionario.Salarioreal = Salarioreal;
            funcionario.Calcado = Calcado;
            funcionario.Cartaconducao = Cartaconducao;
            funcionario.Iban = Iban;

            return funcionario;
        }

    }

    public class FuncionarioOutputModel
    {
        public int id { get; set; }
        public string Nome { get; set; } = null!;
        public string? Dtnascimento { get; set; }
        public string Telemovel { get; set; } = null!;
        public string Contactoemergencia { get; set; } = null!;
        public string Nacionalidade { get; set; } = null!;
        public string Mercado { get; set; } = null!;
        public string Tipodocident { get; set; } = null!;
        public string Docident { get; set; } = null!;
        public string? Tituloresidencia { get; set; }
        public string? Manifestacaointeresse { get; set; }
        public string? Validadedocident { get; set; }
        public string Catprof { get; set; } = null!;
        public string Nif { get; set; } = null!;
        public string Niss { get; set; } = null!;
        public string Morada { get; set; } = null!;
        public string? Contratoinicio { get; set; }
        public string? Contratofim { get; set; }
        public decimal Vencimentobase { get; set; }
        public string Tiposalario { get; set; } = null!;
        public decimal Salarioreal { get; set; }
        public decimal? Calcado { get; set; }
        public string Cartaconducao { get; set; } = null!;
        public string Iban { get; set; } = null!;


    }

   
}
