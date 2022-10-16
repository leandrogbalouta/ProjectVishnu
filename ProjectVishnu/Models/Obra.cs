using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class Obra
    {
        public string Codigointerno { get; set; } = null!;
        public string Designacao { get; set; } = null!;
        public string Cliente { get; set; } = null!;
        public DateOnly Datainicio { get; set; }
        public DateOnly? Datafim { get; set; }
        public string Mercado { get; set; } = null!;
        public string Autosdemedicao { get; set; } = null!;
    }
}
