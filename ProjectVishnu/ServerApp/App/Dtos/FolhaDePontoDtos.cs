using System.Collections;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class FolhaDePontoInfoModel
    {
        public string Mes { get; set; }
        public string Ano { get; set; }
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
        public List<FuncDaysOfWorkInputModel> Values {get; set;}
        
    }

    public class FuncDaysOfWorkInputModel
    {
        public FuncionarioInputModel Func { get; set; }
        public List<WorkDaysInputModel> Dias { get; set; }
        public int? ValorFinal { get; set; }
    }

    public class WorkDaysInputModel
    {
        public int Dia { get; set; }
        public double Horas { get; set; }
    }
    public class FolhaDePontoValuesOutputModel
    {
        public FolhaDePontoInfoModel Info { get; set; }
        public Dictionary<string, Dictionary<int, decimal>> FuncWorkDays { get; set; }
        public Dictionary<string, decimal> FinalValue { get; set; }
        public List<FuncionarioOutputModel> funcionariosOutputModel { get; set; }
        public List<int> Limits { get; set; }
        public List<int> Saturdays { get; set; }
        public List<int> Sundays { get; set; }
        public List<int> Holidays { get; set; }

    }
}
