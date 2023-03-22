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

        public string? Mercado { get; set; }

        public string Tipodocident { get; set; } = null!;

        public string Docident { get; set; } = null!;

        public string? Passaporte { get; set; }

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

        public bool Cartaconducao { get; set; }

        public string Iban { get; set; } = null!;

        public DateOnly? Deleted { get; set; }

        public virtual CategoriasProfissionai CatprofNavigation { get; set; } = null!;
        
        public virtual TipoDoc TipoDocNavigation { get; set; } = null!;

        public virtual ICollection<DiaTrabalho> DiaTrabalhos { get; } = new List<DiaTrabalho>();

        public virtual ICollection<FuncionariosObra> FuncionariosObras { get; } = new List<FuncionariosObra>();

        public virtual ICollection<Obra> ObraChefe { get; } = new List<Obra>();

        public virtual Mercado? MercadoNavigation { get; set; }

        public virtual ICollection<SalarioFinal> SalarioFinals { get; } = new List<SalarioFinal>();
        public FuncionarioOutputModel toOutputModel()
            {
                return new FuncionarioOutputModel
                {
                    Id = Id,
                    Nome = Nome,
                    Dtnascimento = Dtnascimento,
                    Telemovel = Telemovel,
                    Contactoemergencia = Contactoemergencia,
                    Nacionalidade = Nacionalidade,
                    Mercado = Mercado,
                    Tipodocident = Tipodocident,
                    Docident = Docident,
                    Passaporte = Passaporte,
                    Validadedocident = Validadedocident,
                    Catprof = Catprof,
                    Nif = Nif,
                    Niss = Niss,
                    Morada = Morada,
                    Contratoinicio = Contratoinicio,
                    Contratofim = Contratofim,
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

