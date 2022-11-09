namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class FolhaDePontoInfoModel
    {
        public int Mes { get; set; }
        public int Ano { get; set; }
    }

    public class FolhaDePontoEmptyOutputModel
    {
        public FolhaDePontoInfoModel Info { get; set; }
        public List<FuncionarioOutputModel> Funcionarios { get; set; }
        public List<int> Limits { get; set; }
        public List<int> Saturdays { get; set; }
        public List<int> Sundays { get; set; }
        public List<int> Holidays { get; set; }
    }

    public class FolhaDePontoValuesInputModel
    {
        public FolhaDePontoInfoModel Info { get; set; }
        public Dictionary<FuncionarioOutputModel, Dictionary<int, decimal>> FuncWorkDays { get; set; }
        public Dictionary<FuncionarioOutputModel, decimal> FinalValue { get; set; }
        
    }
    public class FolhaDePontoValuesOutputModel
    {
        public FolhaDePontoInfoModel Info { get; set; }
        public Dictionary<FuncionarioOutputModel, Dictionary<int, decimal>> FuncWorkDays { get; set; }
        public Dictionary<FuncionarioOutputModel, decimal> FinalValue { get; set; }
        public List<int> Limits { get; set; }
        public List<int> Saturdays { get; set; }
        public List<int> Sundays { get; set; }
        public List<int> Holidays { get; set; }

    }
}
