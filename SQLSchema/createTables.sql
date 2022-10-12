	
CREATE TABLE FUNCIONARIO(
		Nome varchar(200) NOT NULL,
		DtNascimento date NOT NULL,
		Telemovel varchar(15),
		Naturalidade varchar(20),
		Pais varchar(8) NOT NULL,
		TipoDocIdent varchar(30) NOT NULL,
		DocIdent varchar(15) NOT NULL,
		ValidadeDocIdent date NOT NULL,
		CatProf varchar(20) references CATEGORIAS_PROFISSIONAIS(codigo) NOT NULL,
		NIF varchar(15), /* PRIMARY KEY*/
		NISS varchar(15) NOT NULL,
		Morada varchar(200) NOT NULL,
		ContratoInicio date ,
		ContratoFim date,
		VencimentoBase float(5, 2) NOT NULL,
		TipoSalario	varchar NOT NULL,
		SalarioReal	float(5, 2) NOT NULL,
		Calcado	float(2,1),
		CartaConducao varchar(3),
		IBAN varchar(20),
		Obra varchar(20) references OBRA(CodigoInterno),

		constraint chk_TipoSalario CHECK(TipoSalario IN("horario", "fixo")),
		constraint chk_CartaConducao CHECK(CartaConducao IN("Sim", "Nao"))
);

CREATE TABLE OBRA (
		CodigoInterno varchar(20) primary key,
        Designacao varchar(20),
        Cliente varchar(20),
        DataInicio date,
        DataFim date,
        Pais varchar(8),
        AutosDeMedicao varchar(100),
);

CREATE TABLE OBRAS_PASSADAS(
		Funcionario varchar(15) references Funcionario(NIF),
		Obra varchar(20) references Obra(CodigoInterno)
)

CREATE TABLE DIA_TRABALHO(
		Funcionario varchar(15) references Funcionario(NIF),
        CodigoObra varchar(20)references Obra(CodigoInterno),
        Dia int,
		Horas int,
        Mes varchar(9), 
        Ano int,
        Valor float(7,2),
		constraint chk_Mes CHECK(Mes IN('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro')),
);


CREATE TABLE CATEGORIAS_PROFISSIONAIS(
		codigo varchar(20) PRIMARY KEY,
		nomenclatura varchar(50)
);

CREATE TABLE SALARIO_FINAL(
		Funcionario varchar(15) references Funcionario(NIF),
		Mes varchar(9), 
        Ano int,
        Valor float(7,2),
);