﻿using ProjectVishnu.ServerApp.App.Dtos;
using System;
using System.Collections.Generic;
using ProjectVishnu.Models;

namespace ProjectVishnu.Models
{
    public partial class Obra
    {
        public Obra()
        {
            DiaTrabalhos = new HashSet<DiaTrabalho>();
            FolhaDePontos = new HashSet<FolhaDePonto>();
            FuncionariosObras = new HashSet<FuncionariosObra>();
        }

        public string Codigointerno { get; set; } = null!;
        public string Designacao { get; set; } = null!;
        public string Cliente { get; set; } = null!;
        public DateOnly? Datainicio { get; set; }
        public DateOnly? Datafim { get; set; }
        public string Estado { get; set; } = null!; 
        public string? Chefedeobra { get; set; }
        public string? Mercado { get; set; }
        public string Autosdemedicao { get; set; } = null!;
        public DateOnly? Deleted { get; set; }

        public virtual Funcionario? ChefedeobraNavigation { get; set; }
        public virtual Mercado? MercadoNavigation { get; set; }
        public virtual ICollection<DiaTrabalho> DiaTrabalhos { get; set; }
        public virtual ICollection<FolhaDePonto> FolhaDePontos { get; set; }
        public virtual ICollection<FuncionariosObra> FuncionariosObras { get; set; }

        public ObraOutputModel toObraOutputModel()
        {
            return new ObraOutputModel
            {
                CodigoInterno = Codigointerno,
                Designacao = Designacao,
                Cliente = Cliente,
                Datainicio = Datainicio?.ToShortDateString(),
                Mercado = Mercado,
                Estado = Estado,
                ChefeDeObra = ChefedeobraNavigation?.toOutputModel()
            };
    }
    }

    
}
