using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.RepositoryTests
{
    internal class ObraRepositoryTests : RepositoryTests
    {
        private ObraRepository obraRepository;

        [SetUp]
        public void Setup()
        {
            obraRepository = new ObraRepository(context);
        }

        [TearDown]
        public void TearDown()
        {

        }

        [Test]
        public void ListByMarket()
        {
            IEnumerable<Obra> returnedObras = obraRepository.ListByMarket("albânia");
            Assert.That(returnedObras.Count(), Is.EqualTo(0));

            returnedObras = obraRepository.ListByMarket("frança");
            Assert.That(returnedObras.Count(), Is.EqualTo(0));

            returnedObras = obraRepository.ListByMarket("espanha");
            Assert.That(returnedObras.Count(), Is.EqualTo(1));

            returnedObras = obraRepository.ListByMarket("portugal");
            Assert.That(returnedObras.Count(), Is.EqualTo(1));

            Obra obra1 = returnedObras.First();
            Assert.That(obra1.Codigointerno == "OB22PT01");
        }

        [Test]
        public void ListAlphabetically()
        {
            IEnumerable<Obra> returnedObras = obraRepository.ListAlphabetically();

            Assert.That(returnedObras.Count(), Is.EqualTo(2));
            Assert.That(returnedObras.First().Designacao == "Obra de um edificio");
            Assert.That(returnedObras.Last().Designacao == "Obra em Espanha");
        }

        [Test]
        public void Get()
        {
            Obra esObra = obraRepository.Get("OB22ES01");

            Assert.That(esObra.Designacao == "Obra em Espanha");
            Assert.That(esObra.Mercado == "espanha");

            Obra ptObra = obraRepository.Get("OB22PT01");

            Assert.That(ptObra.Datafim == new DateOnly(2025,5,9));
            Assert.That(ptObra.Cliente == "ISEL");

            Obra frObra = obraRepository.Get("OB19FR04");

            Assert.That(frObra == null);
        }

        [Test]
        public void Add()
        {



        }

        [Test]
        public void CodeNumber()
        {

        }
    }
}
