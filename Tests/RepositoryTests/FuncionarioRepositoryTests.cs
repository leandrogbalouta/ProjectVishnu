using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess;
using ProjectVishnu.DataAccess.Concrete;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.RepositoryTests
{
    public class FuncionarioRepositoryTests : RepositoryTests
    {
        private FuncionarioRepository funcionarioRepository;

        [SetUp]
        public void Setup()
        {    
            funcionarioRepository = new FuncionarioRepository(context);
            context.Database.SetConnectionString("Host=localhost;Database=vishnu;Username=postgres;Password=postgres");
        }

        [TearDown]
        public void TearDown()
        {
            context.Dispose();
        }

        [Test]
        public void ListByMarket()
        {
            IEnumerable<Funcionario> returnedFuncs = funcionarioRepository.ListByMarket("Albânia");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(0));

            returnedFuncs = funcionarioRepository.ListByMarket("França");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ListAlphabetically()
        {

        }

        [Test]
        public void GetByName()
        {

        }

        public void Delete()
        {

        }
        
    }
}
