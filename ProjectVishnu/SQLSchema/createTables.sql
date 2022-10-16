CREATE TABLE CATEGORIAS_PROFISSIONAIS(
		codigo varchar(7) PRIMARY KEY,
		nomenclatura varchar(50) NOT NULL
);

CREATE TABLE FUNCIONARIO(
		Nome varchar(200) NOT NULL,
		DtNascimento date NOT NULL,
		Telemovel varchar(15) NOT NULL,
		ContactoEmergencia varchar(15) NOT NULL,
		Nacionalidade varchar(20) NOT NULL,
		Mercado varchar(8) NOT NULL,
		TipoDocIdent varchar(30) NOT NULL,
		DocIdent varchar(15) NOT NULL,
		TituloResidencia varchar(20),
		ManifestacaoInteresse varchar(20),
		ValidadeDocIdent date NOT NULL,
		CatProf varchar(20) references CATEGORIAS_PROFISSIONAIS(codigo) NOT NULL,
		NIF varchar(15) primary key, 
		NISS varchar(15) NOT NULL,
		Morada varchar(200) NOT NULL,
		ContratoInicio date NOT NULL,
		ContratoFim date NOT NULL,
		VencimentoBase decimal(5, 2) NOT NULL,
		TipoSalario	varchar NOT NULL,
		SalarioReal	decimal(5, 2) NOT NULL,
		Calcado	decimal(2, 1),
		CartaConducao varchar(3) NOT NULL,
		IBAN varchar(30) NOT NULL,

		constraint chk_TipoSalario CHECK(TipoSalario IN('horario', 'fixo')),
		constraint chk_CartaConducao CHECK(CartaConducao IN('Sim', 'Nao'))
);

CREATE TABLE OBRA (
		CodigoInterno varchar(20) primary key,
        Designacao varchar(20) NOT NULL,
        Cliente varchar(20) NOT NULL,
        DataInicio date NOT NULL,
        DataFim date,
        Mercado varchar(8) NOT NULL,
        AutosDeMedicao varchar(100) NOT NULL
);

CREATE TABLE FUNCIONARIOS_OBRAS(
		Funcionario varchar(15) references Funcionario(NIF),
		Obra varchar(20) references Obra(CodigoInterno),
		DataComeco date NOT NULL,
		DataFim date  /* se a data estiver a null sinaliza que é a obra onde o funcionário se encontra atualmente.*/
);

CREATE TABLE DIA_TRABALHO(
		Funcionario varchar(15) references Funcionario(NIF),
        CodigoObra varchar(20)references Obra(CodigoInterno),
        Dia int NOT NULL,
		Horas decimal(2, 1) NOT NULL,
        Mes varchar(9) NOT NULL, 
        Ano int NOT NULL,
        Valor decimal(5, 2) NOT NULL,
		constraint chk_Mes CHECK(Mes IN('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro'))
);

CREATE TABLE SALARIO_FINAL(
		Funcionario varchar(15) references Funcionario(NIF),
		Mes varchar(9) NOT NULL, 
        Ano int NOT NULL,
        ValorFinal decimal(5, 2) NOT NULL,
		ValorAPagar decimal(5, 2)
);

CREATE TABLE CONTA(
		Username varchar(40),
		Pwd varchar(64)
);