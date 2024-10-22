﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ProjectVishnu.Models
{
    public partial class vishnuContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private string _connectionString;
        private bool _usePostgres;
        public vishnuContext(IConfiguration config)
        {
            _configuration = config;
            // _connectionString = connectionString;
            bool.TryParse(_configuration.GetValue<string>("Postgres"), out _usePostgres);
        }
        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");
        }

        public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
        {
            public DateOnlyConverter() : base(
                d => d.ToDateTime(TimeOnly.MinValue),
                d => DateOnly.FromDateTime(d)
            )
            { }
        }

        public virtual DbSet<TipoDoc> TiposDoc { get; set; } = null;
        public virtual DbSet<CategoriasProfissionai> CategoriasProfissionais { get; set; } = null!;
        public virtual DbSet<DiaTrabalho> DiaTrabalhos { get; set; } = null!;
        public virtual DbSet<FolhaDePonto> FolhaDePontos { get; set; } = null!;
        public virtual DbSet<Funcionario> Funcionarios { get; set; } = null!;
        public virtual DbSet<FuncionariosObra> FuncionariosObras { get; set; } = null!;
        public virtual DbSet<Mercado> Mercados { get; set; } = null!;
        public virtual DbSet<Obra> Obras { get; set; } = null!;
        public virtual DbSet<SalarioFinal> SalarioFinals { get; set; } = null!;
        public virtual DbSet<Conta> Contas { get; set; } = null!;
        public virtual DbSet<TipoDeUser> TiposDeUser { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                if (_usePostgres)
                {
                    optionsBuilder.UseLazyLoadingProxies(true).UseNpgsql(_configuration.GetConnectionString("vishnu"));
                }
                else
                {
                    optionsBuilder.UseLazyLoadingProxies(true).UseSqlServer(_configuration.GetConnectionString("vishnuAzure"));
                }
                optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.LazyLoadOnDisposedContextWarning));
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoDoc>(entity =>
            {
                entity.HasKey(e => e.Sigla)
                    .HasName("tipo_doc_pkey");

                entity.ToTable("tipo_doc");

                entity.Property(e => e.Sigla)
                    .HasMaxLength(5)
                    .HasColumnName("sigla");

                entity.Property(e => e.Designacao)
                    .HasMaxLength(50)
                    .HasColumnName("designacao");
            });

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

            modelBuilder.Entity<Conta>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("conta_pkey");

                entity.ToTable("conta");

                entity.Property(e => e.Username)
                    .HasMaxLength(40)
                    .HasColumnName("username");

                entity.Property(e => e.TipoDeUserId)
                    .HasColumnName("tipodeuser");

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(100)
                    .HasColumnName("passwordhash");

                entity.HasOne(e => e.TipoDeUser)
                    .WithMany(t => t.Contas)
                    .HasForeignKey(e => e.TipoDeUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TipoDeUser>(entity =>
            {
                entity.ToTable("tipo_de_user");

                entity.Property(e => e.Id)
                    .HasColumnName("id");

                entity.Property(e => e.Tipo)
                    .HasMaxLength(20)
                    .HasColumnName("tipo");
                entity.Navigation(e => e.Contas)
    .AutoInclude(false);
            });


            modelBuilder.Entity<DiaTrabalho>(entity =>
            {
                entity.HasKey(e => new { e.Funcionario, e.Dia, e.Mes, e.Ano })
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
                    .HasPrecision(3, 1)
                    .HasColumnName("horas");

                entity.Property(e => e.Valor)
                    .HasPrecision(8, 2)
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

            modelBuilder.Entity<FolhaDePonto>(entity =>
            {
                entity.HasKey(e => new { e.Mes, e.Ano, e.Obra })
                    .HasName("folha_de_ponto_pkey");

                entity.ToTable("folha_de_ponto");

                entity.HasIndex(e => e.Id, "folha_de_ponto_id_key")
                    .IsUnique();

                entity.Property(e => e.Mes)
                    .HasMaxLength(9)
                    .HasColumnName("mes");

                entity.Property(e => e.Ano).HasColumnName("ano");

                entity.Property(e => e.Obra)
                    .HasMaxLength(20)
                    .HasColumnName("obra");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Mercado)
                    .HasMaxLength(40)
                    .HasColumnName("mercado");

                entity.Property(e => e.WorkDays)
                    .HasColumnName("workdays");

                entity.HasOne(d => d.MercadoNavigation)
                    .WithMany(p => p.FolhaDePontos)
                    .HasForeignKey(d => d.Mercado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("folha_de_ponto_mercado_fkey");

                entity.HasOne(d => d.ObraNavigation)
                    .WithMany(p => p.FolhaDePontos)
                    .HasForeignKey(d => d.Obra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("folha_de_ponto_obra_fkey");
            });

            modelBuilder.Entity<Funcionario>(entity =>
            {
                entity.HasKey(e => e.Nif).HasName("funcionario_pkey");

                entity.ToTable("funcionario");

                entity.Property(e => e.Nif)
                    .HasMaxLength(15)
                    .HasColumnName("nif");
                entity.Property(e => e.Calcado)
                    .HasPrecision(3, 1)
                    .HasColumnName("calcado");
                entity.Property(e => e.Cartaconducao).HasColumnName("cartaconducao");
                entity.Property(e => e.Catprof)
                    .HasMaxLength(7)
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
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("id");
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
                entity.Property(e => e.Passaporte)
                    .HasMaxLength(20)
                    .HasColumnName("passaporte");
                entity.Property(e => e.Salarioreal)
                    .HasPrecision(8, 2)
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
                entity.Property(e => e.Validadedocident).HasColumnName("validadedocident");
                entity.Property(e => e.Vencimentobase)
                    .HasPrecision(8, 2)
                    .HasColumnName("vencimentobase");

                entity.HasOne(d => d.CatprofNavigation).WithMany(p => p.Funcionarios)
                    .HasForeignKey(d => d.Catprof)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("funcionario_catprof_fkey");

                entity.HasOne(d => d.TipoDocNavigation).WithMany(p => p.Funcionarios)
                    .HasForeignKey(d => d.Tipodocident)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("funcionario_tipodocident_fkey");

                entity.HasOne(d => d.MercadoNavigation).WithMany(p => p.Funcionarios)
                    .HasForeignKey(d => d.Mercado)
                    .HasConstraintName("funcionario_mercado_fkey");
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

            modelBuilder.Entity<Mercado>(entity =>
            {
                entity.HasKey(e => e.Mercadoname)
                    .HasName("mercado_pkey");

                entity.ToTable("mercado");

                entity.Property(e => e.Mercadoname)
                    .HasMaxLength(40)
                    .HasColumnName("mercadoname");

                entity.Property(e => e.DiaFim).HasColumnName("dia_fim");

                entity.Property(e => e.DiaInicio).HasColumnName("dia_inicio");

                entity.Property(e => e.Sigla)
                    .HasMaxLength(2)
                    .HasColumnName("sigla");
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

                entity.Property(e => e.Estado)
                .HasMaxLength(15)
                .HasColumnName("estado");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.Designacao)
                    .HasMaxLength(20)
                    .HasColumnName("designacao");

                entity.Property(e => e.Mercado)
                    .HasMaxLength(40)
                    .HasColumnName("mercado");

                entity.Property(e => e.Chefedeobra)
                    .HasMaxLength(15)
                    .HasColumnName("chefedeobra");

                entity.HasOne(d => d.ChefedeobraNavigation).WithMany(p => p.ObraChefe)
                .HasForeignKey(d => d.Chefedeobra)
                .HasConstraintName("obra_chefedeobra_fkey");

                entity.HasOne(d => d.MercadoNavigation)
                    .WithMany(p => p.Obras)
                    .HasForeignKey(d => d.Mercado)
                    .HasConstraintName("obra_mercado_fkey");
            });

            modelBuilder.Entity<SalarioFinal>(entity =>
            {
                entity.HasKey(e => new { e.Funcionario, e.Mes, e.Ano })
                    .HasName("salario_final_pkey");

                entity.ToTable("salario_final");

                entity.HasIndex(e => e.Id, "salario_final_id_key")
                    .IsUnique();

                entity.Property(e => e.Funcionario)
                    .HasMaxLength(15)
                    .HasColumnName("funcionario");

                entity.Property(e => e.Mes)
                    .HasMaxLength(9)
                    .HasColumnName("mes");

                entity.Property(e => e.Ano).HasColumnName("ano");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Valorapagar)
                    .HasPrecision(8, 2)
                    .HasColumnName("valorapagar");

                entity.Property(e => e.Valorfinal)
                    .HasPrecision(8, 2)
                    .HasColumnName("valorfinal");

                entity.HasOne(d => d.FuncionarioNavigation)
                    .WithMany(p => p.SalarioFinals)
                    .HasForeignKey(d => d.Funcionario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("salario_final_funcionario_fkey");

                entity.HasMany(d => d.IdFolhaDePontos)
                    .WithMany(p => p.IdSalarios)
                    .UsingEntity<Dictionary<string, object>>(
                        "FolhasSalario",
                        l => l.HasOne<FolhaDePonto>().WithMany().HasPrincipalKey("Id").HasForeignKey("IdFolhaDePonto").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("folhas_salario_id_folha_de_ponto_fkey"),
                        r => r.HasOne<SalarioFinal>().WithMany().HasPrincipalKey("Id").HasForeignKey("IdSalario").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("folhas_salario_id_salario_fkey"),
                        j =>
                        {
                            j.HasKey("IdSalario", "IdFolhaDePonto").HasName("folhas_salario_pkey");

                            j.ToTable("folhas_salario");

                            j.IndexerProperty<int>("IdSalario").HasColumnName("id_salario");

                            j.IndexerProperty<int>("IdFolhaDePonto").HasColumnName("id_folha_de_ponto");
                        });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
