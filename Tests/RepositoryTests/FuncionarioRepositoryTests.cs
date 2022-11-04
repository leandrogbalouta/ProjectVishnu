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
    [TestFixture]
    public class FuncionarioRepositoryTests : RepositoryTests
    {
        private FuncionarioRepository funcionarioRepository;

        [SetUp]
        public void Setup()
        {    
            funcionarioRepository = new FuncionarioRepository(context);
        }

        [TearDown]
        public void TearDown()
        {
            
        }

        [Test]
        public void ListByMarket()
        {
            IEnumerable<Funcionario> returnedFuncs = funcionarioRepository.ListByMarket("albânia");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(0));

            returnedFuncs = funcionarioRepository.ListByMarket("frança");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(0));

            returnedFuncs = funcionarioRepository.ListByMarket("espanha");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(1));

            returnedFuncs = funcionarioRepository.ListByMarket("portugal");
            Assert.That(returnedFuncs.Count(), Is.EqualTo(2));

            Funcionario func1 = returnedFuncs.First();
            Assert.That(func1.Nif == "234567899");

            Funcionario func2 = returnedFuncs.ElementAt(1);
            Assert.That(func2.Nif == "255896379");
        }

        [Test]
        public void ListAlphabetically()
        {
            IEnumerable<Funcionario> returnedFuncs = funcionarioRepository.ListAlphabetically();
            Assert.That(returnedFuncs.Count(), Is.EqualTo(3));
            Funcionario func1 = returnedFuncs.ElementAt(0);
            Funcionario func2 = returnedFuncs.ElementAt(1);
            Funcionario func3 = returnedFuncs.ElementAt(2);

            Assert.That(func1.Nif == "234567899");
            Assert.That(func2.Nif == "255896379");
            Assert.That(func3.Nif == "244555678");

        }

        [Test]
        public void GetByName()
        {
            Funcionario fouto = funcionarioRepository.SearchByName("Francisco Martins").First();
            Assert.That(fouto.Nif, Is.EqualTo("255896379"));
        }

        [Test]
        public void Delete()
        {
            Funcionario fouto = funcionarioRepository.SearchByName("Francisco Martins").First();
            funcionarioRepository.Delete(fouto.Id);
            IEnumerable<Funcionario> returnedFuncs = funcionarioRepository.ListAlphabetically();
            Assert.That(returnedFuncs.Count, Is.EqualTo(2));
            returnedFuncs = funcionarioRepository.ListByMarket("portugal");
            Assert.That(returnedFuncs.Count, Is.EqualTo(1));
            fouto = funcionarioRepository.Get(fouto.Id);
            Assert.That(fouto.Deleted != null);
        }

        [Test]
        public void Add()
        {
            Funcionario newFunc = new Funcionario();
            newFunc.Nome="Leandro Balouta";

            Assert.Throws<InvalidOperationException>(() => funcionarioRepository.Add(newFunc));
            newFunc.Nif = "102039482";
            funcionarioRepository.Add(newFunc);
            IEnumerable<Funcionario> addedFunc = funcionarioRepository.SearchByName("Leandro Balouta");
            Assert.That(addedFunc.Count(), Is.EqualTo(0));
           
        }
    }
}
