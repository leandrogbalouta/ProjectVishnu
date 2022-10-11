	
CREATE TABLE FUNCIONARIO(
		Nome varchar(200),
		DtNascimento date,
		Telemovel varchar(15),
		Pais varchar(8),
		TipoDocIdent varchar(30),
		DocIdent varchar(15),
		ValidadeDocIdent date,
		CatProf enum ('', ' '),
		NIF varchar(15),
		NISS varchar(15),
		Morada varchar(200),
		ContratoInicio date,
		ContratoFim date,
		VencimentoBase double,
		TipoSalario	enum ('', ' '),
		SalarioReal	double,
		Calcado	double,
		CartaConducao boolean,
		IBAN varchar(20)
);

CREATE TABLE OBRA (
		CodigoInterno varchar(20) primary key,
        Designacao varchar(20),
        Cliente varchar(20),
        DataInicio date,
        DataFim date,
        Pais varchar(8),
        Funcionarios ???,
        AutosDeMedicao ???,
        FolhasDePonto ???
);

CREATE TABLE  (
		Funcionario ???,
        CodigoObra varchar(20),
        Dia int,
		Horas int,
        Mes enum ('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro'),
        Ano int,
        Valor double,
        foreign key (CodigoObra) references OBRA(CodigoInterno),
        foreign key () references FUNCIONARIO()
);

CREATE TABLE  (
		Funcionario ???,
        Mes enum ('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro'),
        Valor double
);
