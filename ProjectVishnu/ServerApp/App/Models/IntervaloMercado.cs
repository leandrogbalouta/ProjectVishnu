using System;
using System.Collections.Generic;

namespace ProjectVishnu.ServerApp.App.Models
{
    public partial class IntervaloMercado
    {
        public string Mercado { get; set; } = null!;
        public int? DiaInicio { get; set; }
        public int? DiaFim { get; set; }
    }
}
