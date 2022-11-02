using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.RepositoryTests
{
    public class RepositoryTests
    {
        protected vishnuContext context;

        [SetUp]
        public void Setup()
        {
            context = new vishnuContext();
            context.Database.SetConnectionString("Host=localhost;Database=vishnuTests;Username=postgres;Password=postgres");
            createDB();
            populateDB();
        }

        [TearDown]
        public void TearDown()
        {
            //context.Database.EnsureDeleted();
        }

        public void createDB()
        {
            context.Database.EnsureCreated();

        }

        public void populateDB()
        {
            var sql = System.IO.File.ReadAllText("../../../../ProjectVishnu/ServerApp/App/SQLSchema/insertTables.sql");
            context.Database.ExecuteSqlRaw(sql);
        }
    }

   
}
