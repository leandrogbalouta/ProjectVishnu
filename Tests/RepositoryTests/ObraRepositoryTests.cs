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
            Assert.That(returnedObras.Count(), Is.EqualTo(0));

            returnedObras = obraRepository.ListByMarket("portugal");
            Assert.That(returnedObras.Count(), Is.EqualTo(1));

            Obra obra1 = returnedObras.First();
            Assert.That(obra1.Codigointerno == "OB22PT04");
        }       
    }
}
