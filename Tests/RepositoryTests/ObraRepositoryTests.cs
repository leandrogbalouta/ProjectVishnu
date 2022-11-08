using ProjectVishnu.DataAccess.Repository;
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
            //TODO


        }

        [Test]
        public void SearchByCodeNumber()
        {
            int codeNumberPt = obraRepository.SearchByCodeNumber("OB22PT");
            Assert.That(codeNumberPt == 1);

            int codeNumberEs = obraRepository.SearchByCodeNumber("OB22ES");
            Assert.That(codeNumberEs == 1);

            int codeNumberFr = obraRepository.SearchByCodeNumber("OB22FR");
            Assert.That(codeNumberFr == 0);
        }

        [Test]
        public void Delete()
        {
            Obra obra1 = obraRepository.Get("OB22PT01");
            Obra obra2 = obraRepository.Get("OB22ES01");
            obraRepository.Delete("OB22PT01");

            Assert.That(obra1.Deleted == DateOnly.FromDateTime(DateTime.Now));
            Assert.That(obra2.Deleted == null);
            
        }

        [Test]
        public void Update()
        {
            Obra obra = obraRepository.Get("OB22PT01");

            Assert.That(obra.Designacao == "Obra de um edificio");
            Assert.That(obra.Cliente == "ISEL");
            Assert.That(obra.Datainicio == new DateOnly(2022,5,9));
            Assert.That(obra.Datafim == new DateOnly(2025,5,9));
            Assert.That(obra.Mercado == "portugal");
            Assert.That(obra.Autosdemedicao == "Autos de medicao");

            obra.Designacao = "Nova Designacao";
            obra.Cliente = "Novo Cliente";
            obra.Datainicio = new DateOnly(2022,3,9);
            obra.Datafim = new DateOnly(2025,4,5);
            obra.Mercado = "portugal";
            obra.Autosdemedicao = "Autos de medicao";

            obraRepository.Update("OB22PT01", obra);

            Assert.That(obra.Designacao == "Nova Designacao");
            Assert.That(obra.Cliente == "Novo Cliente");
            Assert.That(obra.Datainicio == new DateOnly(2022, 3, 9));
            Assert.That(obra.Datafim == new DateOnly(2025, 4, 5));
            Assert.That(obra.Mercado == "portugal");
            Assert.That(obra.Autosdemedicao == "Autos de medicao");

        }
    }
}
