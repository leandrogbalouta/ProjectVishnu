using ProjectVishnu.ServerApp.App.Dtos;
using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class Funcionario
    {
        public Funcionario()
        {
            DiaTrabalhos = new HashSet<DiaTrabalho>();
            FuncionariosObras = new HashSet<FuncionariosObra>();
            SalarioFinals = new HashSet<SalarioFinal>();
        }

        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public DateOnly Dtnascimento { get; set; }
        public string Telemovel { get; set; } = null!;
        public string Contactoemergencia { get; set; } = null!;
        public string Nacionalidade { get; set; } = null!;
        public string Mercado { get; set; } = null!;
        public string Tipodocident { get; set; } = null!;
        public string Docident { get; set; } = null!;
        public string? Tituloresidencia { get; set; }
        public string? Manifestacaointeresse { get; set; }
        public DateOnly Validadedocident { get; set; }
        public string Catprof { get; set; } = null!;
        public string Nif { get; set; } = null!;
        public string Niss { get; set; } = null!;
        public string Morada { get; set; } = null!;
        public DateOnly Contratoinicio { get; set; }
        public DateOnly Contratofim { get; set; }
        public decimal Vencimentobase { get; set; }
        public string Tiposalario { get; set; } = null!;
        public decimal Salarioreal { get; set; }
        public decimal? Calcado { get; set; }
        public string Cartaconducao { get; set; } = null!;
        public string Iban { get; set; } = null!;
        public DateOnly? Deleted { get; set; }

        public virtual CategoriasProfissionai CatprofNavigation { get; set; } = null!;
        public virtual ICollection<DiaTrabalho> DiaTrabalhos { get; set; }
        public virtual ICollection<FuncionariosObra> FuncionariosObras { get; set; }
        public virtual ICollection<SalarioFinal> SalarioFinals { get; set; }

        public FuncionarioOutputModel toOutputModel()
        {
            return new FuncionarioOutputModel
            {
                id = Id,
                Nome = Nome,
                Dtnascimento = Dtnascimento.ToShortDateString(),
                Telemovel = Telemovel,
                Contactoemergencia = Contactoemergencia,
                Nacionalidade = Nacionalidade,
                Mercado = Mercado,
                Tipodocident = Tipodocident,
                Docident = Docident,
                Tituloresidencia = Tituloresidencia,
                Manifestacaointeresse = Manifestacaointeresse,
                Validadedocident = Validadedocident.ToShortDateString(),
                Catprof = Catprof,
                Nif = Nif,
                Niss = Niss,
                Morada = Morada,
                Contratoinicio = Contratoinicio.ToShortDateString(),
                Contratofim = Contratofim.ToShortDateString(),
                Vencimentobase = Vencimentobase,
                Tiposalario = Tiposalario,
                Salarioreal = Salarioreal,
                Calcado = Calcado,
                Cartaconducao = Cartaconducao,
                Iban = Iban
            };
        }
    }
}
