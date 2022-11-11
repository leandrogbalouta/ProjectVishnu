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
            return new Funcionario
            {
                Nome = Nome,
                Dtnascimento = DateOnly.Parse(Dtnascimento),
                Telemovel = Telemovel,
                Contactoemergencia = Contactoemergencia,
                Nacionalidade = Nacionalidade,
                Mercado = Mercado,
                Tipodocident = Tipodocident,
                Docident = Docident,
                Tituloresidencia = Tituloresidencia,
                Manifestacaointeresse = Manifestacaointeresse,
                Validadedocident = DateOnly.Parse(Validadedocident),
                Catprof = Catprof,
                Nif = Nif,
                Niss = Niss,
                Morada = Morada,
                Contratoinicio = DateOnly.Parse(Contratoinicio),
                Contratofim = DateOnly.Parse(Contratofim),
                Vencimentobase = Vencimentobase,
                Tiposalario = Tiposalario,
                Salarioreal = Salarioreal,
                Calcado = Calcado,
                Cartaconducao = Cartaconducao,
                Iban = Iban
            };
        }

    }

    public class FuncionarioOutputModel
    {
        public int Id { get; set; }
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
