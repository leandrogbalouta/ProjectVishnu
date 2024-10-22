﻿using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class FuncionarioRepository : Repository<Funcionario>, IFuncionarioRepository
    {

        int VALIDATY_WARNING_DAYS = 45;
        public FuncionarioRepository(vishnuContext context)
            : base(context)
        {
        }
        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).OrderBy(func => func.Nome);
        }

        public IEnumerable<Funcionario> ListWithFilters(string? mercado = null, string? nome = null)
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => Filter(func, mercado, nome)).OrderBy(func => func.Nome);
        }

        public Funcionario? Get(int id) => VishnuContext.Funcionarios.SingleOrDefault(func => func.Id == id);

        public IEnumerable<Funcionario> GetAll()
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists);
        }

        public void Delete(int id)
        {
            VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Id == id).First().Deleted = DateOnly.FromDateTime(DateTime.Now);
        }

        public void Update(Funcionario funcionario)
        {
            VishnuContext.Funcionarios.Update(funcionario).Property(func => func.Id).IsModified = false;
        }

        public int GetValidityWarningCount()
        {
            DateOnly date = DateOnly.FromDateTime(DateTime.Today);
            date = date.AddDays(VALIDATY_WARNING_DAYS);
            return VishnuContext.Funcionarios.Where(func => date > func.Validadedocident).Count();
        }

        public IEnumerable<Funcionario> GetValidityWarningList()
        {
            DateOnly date = DateOnly.FromDateTime(DateTime.Today);
            date = date.AddDays(VALIDATY_WARNING_DAYS);
            return VishnuContext.Funcionarios.Where(func => date > func.Validadedocident).ToList();
        }

        public FuncionariosObra? GetCurrentObra(int id)
        {
            return Get(id).FuncionariosObras.SingleOrDefault(fo => fo.Datafim == null);
        }

        public IEnumerable<FuncionariosObra> GetPastObras(int id)
        {
            return Get(id).FuncionariosObras.Where(fo => fo.Datafim != null).ToList();
        }


        public IEnumerable<Funcionario> Find(Expression<Func<Funcionario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Add(Funcionario entity)
        {
            base.Add(entity);
        }

        public void AddRange(IEnumerable<Funcionario> entities)
        {
            throw new NotImplementedException();
        }

        public void Remove(Funcionario entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Funcionario> entities)
        {
            throw new NotImplementedException();
        }

        private bool FuncionarioExists(Funcionario func)
        {
            return func.Deleted == null;
        }

        public int GetFuncId(string nif)
        {
            return VishnuContext.Funcionarios.Where(func => func.Nif == nif).First().Id;
        }



        bool Filter(Funcionario func, string? mercado, string? valor)
        {
            bool mercadoCondition = mercado == null ? true : func.Mercado.Contains(mercado);
            bool valorCondition = valor == null ? true : func.Nome.Contains(valor);

            return mercadoCondition && valorCondition;
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
