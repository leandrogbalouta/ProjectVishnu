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
            Funcionario fouto = funcionarioRepository.GetByName("Francisco Martins").First();
            Assert.That(fouto.Nif, Is.EqualTo("255896379"));
            Assert.That(fouto.Dtnascimento, Is.EqualTo(new DateOnly(1999, 3, 20)));
        }

        [Test]
        public void Delete()
        {
            Funcionario fouto = funcionarioRepository.GetByName("Francisco Martins").First();
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
            Funcionario newFunc1 = new Funcionario();
            newFunc1.Nome="Leandro Balouta";

            Assert.Throws<InvalidOperationException>(() => funcionarioRepository.Add(newFunc1));
            newFunc1.Nif = "102039482";
            funcionarioRepository.Add(newFunc1);
            IEnumerable<Funcionario> addedFunc = funcionarioRepository.GetByName("Leandro Balouta");
            Assert.That(addedFunc.Count(), Is.EqualTo(0));

            Funcionario newFunc2 = new Funcionario();
            newFunc2.Nome = "Joaquim Mendes";
            newFunc2.Dtnascimento = new DateOnly(1987, 9, 8);
            newFunc2.Telemovel = "918997656";
            newFunc2.Contactoemergencia = "213453453";
            newFunc2.Nacionalidade = "portuguesa";
            newFunc2.Mercado = "franca";
            newFunc2.Tipodocident = "CC";
            newFunc2.Docident = "123123123";
            newFunc2.Validadedocident = new DateOnly(2028, 5, 6);
            newFunc2.Catprof = "1234567";
            newFunc2.Nif = "234432234";
            newFunc2.Niss = "12121212121212";
            newFunc2.Morada = "Rua joaquim alberto n13";
            newFunc2.Contratoinicio = new DateOnly(2022,5,5);
            newFunc2.Contratofim = new DateOnly(2025,5,5);
            newFunc2.Vencimentobase = 800;
            newFunc2.Tiposalario = "fixo";
            newFunc2.Cartaconducao = "Nao";
            newFunc2.Iban = "33333333333333333333";

            funcionarioRepository.Add(newFunc2);

            IEnumerable<Funcionario> returnedFunc = funcionarioRepository.GetByName("Joaquim Mendes");

            Assert.That(newFunc2.Nome, Is.EqualTo(returnedFunc.First().Nome));
        }
    }
}
