using System;
using System.Collections.Generic;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Models
{
    public partial class FuncionariosObra
    {
        public string Funcionario { get; set; } = null!;
        public string Obra { get; set; } = null!;
        public DateOnly Datacomeco { get; set; }
        public DateOnly? Datafim { get; set; }

        public virtual Funcionario FuncionarioNavigation { get; set; } = null!;
        public virtual Obra ObraNavigation { get; set; } = null!;

        public FuncionarioObraOutputModel toObraOutputModel()
        {
            return new FuncionarioObraOutputModel
            {
                Funcionario = FuncionarioNavigation.toOutputModel(),
                DataInicio = Datacomeco,
                DataFim = Datafim
            };
        }

        public ObraFuncionarioOutputModel toFuncionarioOutputModel()
        {
            return new ObraFuncionarioOutputModel
            {
                Obra = ObraNavigation.toObraOutputModel(),
                DataInicio = Datacomeco,
                DataFim = Datafim
            };
        }
    }
}
