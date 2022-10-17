using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjectVishnu.Models
{
    public partial class vishnuContext : DbContext
    {
        public vishnuContext()
        {
        }

        public vishnuContext(DbContextOptions<vishnuContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CategoriasProfissionai> CategoriasProfissionais { get; set; } = null!;
        public virtual DbSet<Contum> Conta { get; set; } = null!;
        public virtual DbSet<DiaTrabalho> DiaTrabalhos { get; set; } = null!;
        public virtual DbSet<Funcionario> Funcionarios { get; set; } = null!;
        public virtual DbSet<FuncionariosObra> FuncionariosObras { get; set; } = null!;
        public virtual DbSet<IntervaloMercado> IntervaloMercados { get; set; } = null!;
        public virtual DbSet<Obra> Obras { get; set; } = null!;
        public virtual DbSet<SalarioFinal> SalarioFinals { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategoriasProfissionai>(entity =>
            {
                entity.HasKey(e => e.Codigo)
                    .HasName("categorias_profissionais_pkey");

                entity.ToTable("categorias_profissionais");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(7)
                    .HasColumnName("codigo");

                entity.Property(e => e.Nomenclatura)
                    .HasMaxLength(50)
                    .HasColumnName("nomenclatura");
            });

            modelBuilder.Entity<Contum>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("conta_pkey");

                entity.ToTable("conta");

                entity.Property(e => e.Username)
                    .HasMaxLength(40)
                    .HasColumnName("username");

                entity.Property(e => e.Pwd)
                    .HasMaxLength(64)
                    .HasColumnName("pwd");
            });

            modelBuilder.Entity<DiaTrabalho>(entity =>
            {
                entity.HasKey(e => new { e.Funcionario, e.Codigoobra, e.Dia, e.Mes, e.Ano })
                    .HasName("dia_trabalho_pkey");

                entity.ToTable("dia_trabalho");

                entity.Property(e => e.Funcionario)
                    .HasMaxLength(15)
                    .HasColumnName("funcionario");

                entity.Property(e => e.Codigoobra)
                    .HasMaxLength(20)
                    .HasColumnName("codigoobra");

                entity.Property(e => e.Dia).HasColumnName("dia");

                entity.Property(e => e.Mes)
                    .HasMaxLength(9)
                    .HasColumnName("mes");

                entity.Property(e => e.Ano).HasColumnName("ano");

                entity.Property(e => e.Horas)
                    .HasPrecision(2, 1)
                    .HasColumnName("horas");

                entity.Property(e => e.Valor)
                    .HasPrecision(5, 2)
                    .HasColumnName("valor");

                entity.HasOne(d => d.CodigoobraNavigation)
                    .WithMany(p => p.DiaTrabalhos)
                    .HasForeignKey(d => d.Codigoobra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("dia_trabalho_codigoobra_fkey");

                entity.HasOne(d => d.FuncionarioNavigation)
                    .WithMany(p => p.DiaTrabalhos)
                    .HasForeignKey(d => d.Funcionario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("dia_trabalho_funcionario_fkey");
            });

            modelBuilder.Entity<Funcionario>(entity =>
            {
                entity.HasKey(e => e.Nif)
                    .HasName("funcionario_pkey");

                entity.ToTable("funcionario");

                entity.Property(e => e.Nif)
                    .HasMaxLength(15)
                    .HasColumnName("nif");

                entity.Property(e => e.Calcado)
                    .HasPrecision(2, 1)
                    .HasColumnName("calcado");

                entity.Property(e => e.Cartaconducao)
                    .HasMaxLength(3)
                    .HasColumnName("cartaconducao");

                entity.Property(e => e.Catprof)
                    .HasMaxLength(20)
                    .HasColumnName("catprof");

                entity.Property(e => e.Contactoemergencia)
                    .HasMaxLength(15)
                    .HasColumnName("contactoemergencia");

                entity.Property(e => e.Contratofim).HasColumnName("contratofim");

                entity.Property(e => e.Contratoinicio).HasColumnName("contratoinicio");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Docident)
                    .HasMaxLength(15)
                    .HasColumnName("docident");

                entity.Property(e => e.Dtnascimento).HasColumnName("dtnascimento");

                entity.Property(e => e.Iban)
                    .HasMaxLength(30)
                    .HasColumnName("iban");

                entity.Property(e => e.Manifestacaointeresse)
                    .HasMaxLength(20)
                    .HasColumnName("manifestacaointeresse");

                entity.Property(e => e.Mercado)
                    .HasMaxLength(40)
                    .HasColumnName("mercado");

                entity.Property(e => e.Morada)
                    .HasMaxLength(200)
                    .HasColumnName("morada");

                entity.Property(e => e.Nacionalidade)
                    .HasMaxLength(20)
                    .HasColumnName("nacionalidade");

                entity.Property(e => e.Niss)
                    .HasMaxLength(15)
                    .HasColumnName("niss");

                entity.Property(e => e.Nome)
                    .HasMaxLength(200)
                    .HasColumnName("nome");

                entity.Property(e => e.Salarioreal)
                    .HasPrecision(5, 2)
                    .HasColumnName("salarioreal");

                entity.Property(e => e.Telemovel)
                    .HasMaxLength(15)
                    .HasColumnName("telemovel");

                entity.Property(e => e.Tipodocident)
                    .HasMaxLength(30)
                    .HasColumnName("tipodocident");

                entity.Property(e => e.Tiposalario)
                    .HasColumnType("character varying")
                    .HasColumnName("tiposalario");

                entity.Property(e => e.Tituloresidencia)
                    .HasMaxLength(20)
                    .HasColumnName("tituloresidencia");

                entity.Property(e => e.Validadedocident).HasColumnName("validadedocident");

                entity.Property(e => e.Vencimentobase)
                    .HasPrecision(5, 2)
                    .HasColumnName("vencimentobase");

                entity.HasOne(d => d.CatprofNavigation)
                    .WithMany(p => p.Funcionarios)
                    .HasForeignKey(d => d.Catprof)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("funcionario_catprof_fkey");
            });

            modelBuilder.Entity<FuncionariosObra>(entity =>
            {
                entity.HasKey(e => new { e.Funcionario, e.Obra, e.Datacomeco })
                    .HasName("funcionarios_obras_pkey");

                entity.ToTable("funcionarios_obras");

                entity.Property(e => e.Funcionario)
                    .HasMaxLength(15)
                    .HasColumnName("funcionario");

                entity.Property(e => e.Obra)
                    .HasMaxLength(20)
                    .HasColumnName("obra");

                entity.Property(e => e.Datacomeco).HasColumnName("datacomeco");

                entity.Property(e => e.Datafim).HasColumnName("datafim");

                entity.HasOne(d => d.FuncionarioNavigation)
                    .WithMany(p => p.FuncionariosObras)
                    .HasForeignKey(d => d.Funcionario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("funcionarios_obras_funcionario_fkey");

                entity.HasOne(d => d.ObraNavigation)
                    .WithMany(p => p.FuncionariosObras)
                    .HasForeignKey(d => d.Obra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("funcionarios_obras_obra_fkey");
            });

            modelBuilder.Entity<IntervaloMercado>(entity =>
            {
                entity.HasKey(e => e.Mercado)
                    .HasName("intervalo_mercado_pkey");

                entity.ToTable("intervalo_mercado");

                entity.Property(e => e.Mercado)
                    .HasMaxLength(40)
                    .HasColumnName("mercado");

                entity.Property(e => e.DiaFim).HasColumnName("dia_fim");

                entity.Property(e => e.DiaInicio).HasColumnName("dia_inicio");
            });

            modelBuilder.Entity<Obra>(entity =>
            {
                entity.HasKey(e => e.Codigointerno)
                    .HasName("obra_pkey");

                entity.ToTable("obra");

                entity.Property(e => e.Codigointerno)
                    .HasMaxLength(20)
                    .HasColumnName("codigointerno");

                entity.Property(e => e.Autosdemedicao)
                    .HasMaxLength(100)
                    .HasColumnName("autosdemedicao");

                entity.Property(e => e.Cliente)
                    .HasMaxLength(20)
                    .HasColumnName("cliente");

                entity.Property(e => e.Datafim).HasColumnName("datafim");

                entity.Property(e => e.Datainicio).HasColumnName("datainicio");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Designacao)
                    .HasMaxLength(20)
                    .HasColumnName("designacao");

                entity.Property(e => e.Mercado)
                    .HasMaxLength(40)
                    .HasColumnName("mercado");
            });

            modelBuilder.Entity<SalarioFinal>(entity =>
            {
                entity.HasKey(e => new { e.Funcionario, e.Mes, e.Ano })
                    .HasName("salario_final_pkey");

                entity.ToTable("salario_final");

                entity.Property(e => e.Funcionario)
                    .HasMaxLength(15)
                    .HasColumnName("funcionario");

                entity.Property(e => e.Mes)
                    .HasMaxLength(9)
                    .HasColumnName("mes");

                entity.Property(e => e.Ano).HasColumnName("ano");

                entity.Property(e => e.Valorapagar)
                    .HasPrecision(5, 2)
                    .HasColumnName("valorapagar");

                entity.Property(e => e.Valorfinal)
                    .HasPrecision(5, 2)
                    .HasColumnName("valorfinal");

                entity.HasOne(d => d.FuncionarioNavigation)
                    .WithMany(p => p.SalarioFinals)
                    .HasForeignKey(d => d.Funcionario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("salario_final_funcionario_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
