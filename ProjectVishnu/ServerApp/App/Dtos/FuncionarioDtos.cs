using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class FuncionarioInputModel
    {
        public string Nome { get; set; } = null!;
        public DateOnly? Dtnascimento { get; set; }
        public string Telemovel { get; set; } = null!;
        public string Contactoemergencia { get; set; } = null!;
        public string Nacionalidade { get; set; } = null!;
        public string Mercado { get; set; } = null!;
        public string Tipodocident { get; set; } = null!;
        public string Docident { get; set; } = null!;
        public string? Passaporte { get; set; }
        public DateOnly? Validadedocident { get; set; }
        public string Catprof { get; set; } = null!;
        public string Nif { get; set; } = null!;
        public string Niss { get; set; } = null!;
        public string Morada { get; set; } = null!;
        public DateOnly? Contratoinicio { get; set; }
        public DateOnly? Contratofim { get; set; }
        public decimal Vencimentobase { get; set; }
        public string Tiposalario { get; set; } = null!;
        public decimal Salarioreal { get; set; }
        public decimal? Calcado { get; set; } = null;
        public bool Cartaconducao { get; set; }
        public string Iban { get; set; } = null!;

        public Funcionario ToFuncionario()
        {
            return new Funcionario
            {
                Nome = Nome,
                Dtnascimento = (Dtnascimento is not null) ? DateOnly.Parse(Dtnascimento.Value.ToShortDateString()!) : DateOnly.MinValue, // TODO CHECK ALL NULLABLE DATES IN THIS CTOR (pure code smell, but im tired, finna check this tomorrow..)
                Telemovel = Telemovel,
                Contactoemergencia = Contactoemergencia,
                Nacionalidade = Nacionalidade,
                Mercado = Mercado,
                Tipodocident = Tipodocident,
                Docident = Docident,
                Passaporte = Passaporte,
                Validadedocident = (Validadedocident  is not null) ? DateOnly.Parse(Validadedocident.Value.ToShortDateString()!) : DateOnly.MinValue,
                Catprof = Catprof,
                Nif = Nif,
                Niss = Niss,
                Morada = Morada,
                Contratoinicio = (Contratoinicio  is not null) ? DateOnly.Parse(Contratoinicio.Value.ToShortDateString()!) : DateOnly.MinValue,
                Contratofim = (Contratofim is not null) ? DateOnly.Parse(Contratofim.ToString()!) : DateOnly.MinValue,
                Vencimentobase = Vencimentobase,
                Tiposalario = Tiposalario,
                Salarioreal = Salarioreal,
                Calcado = Calcado,
                Cartaconducao = Cartaconducao,
                Iban = Iban
                // Smells like teen 🚽
            };
        }

    }

    public class FuncionarioOutputModel
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public DateOnly? Dtnascimento { get; set; }
        public string Telemovel { get; set; } = null!;
        public string Contactoemergencia { get; set; } = null!;
        public string Nacionalidade { get; set; } = null!;
        public string Mercado { get; set; } = null!;
        public string Tipodocident { get; set; } = null!;
        public string Docident { get; set; } = null!;
        public string? Passaporte { get; set; }
        public DateOnly? Validadedocident { get; set; }
        public string Catprof { get; set; } = null!;
        public string Nif { get; set; } = null!;
        public string Niss { get; set; } = null!;
        public string Morada { get; set; } = null!;
        public DateOnly? Contratoinicio { get; set; }
        public DateOnly? Contratofim { get; set; }
        public decimal Vencimentobase { get; set; }
        public string Tiposalario { get; set; } = null!;
        public decimal Salarioreal { get; set; }
        public decimal? Calcado { get; set; }
        public bool Cartaconducao { get; set; }
        public string Iban { get; set; } = null!;


    }

    public class ValidityWarningOutputModel{
        public int Count {get; set;}
        public IEnumerable<FuncionarioOutputModel>? funcList {get; set;}
    }

    public class ObraFuncionarioOutputModel{
        public ObraOutputModel Obra {get; set;}
        public DateOnly? DataInicio {get; set;}
        public DateOnly? DataFim {get; set;}
    }
   

   public class ObraInsertionModel{
    public string CodigoInterno {get;set;}
    public string Date {get; set;}
   }
}
