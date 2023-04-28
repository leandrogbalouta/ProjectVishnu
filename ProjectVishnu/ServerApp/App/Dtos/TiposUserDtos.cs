namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class TiposUserInputModel
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = null!;
    }

    public class TiposUserOutputModel 
    {
        public string Tipo {get; set;}
    }
}