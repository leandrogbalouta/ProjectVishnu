CREATE TABLE CATEGORIAS_PROFISSIONAIS(
		codigo varchar(7) PRIMARY KEY,
		nomenclatura varchar(50) NOT NULL
);

CREATE TABLE MERCADO(
		MercadoName varchar(40) primary key,
		Sigla varchar(2),
		Dia_Inicio int,
		Dia_Fim int
);

CREATE TABLE FUNCIONARIO(
		Id INT GENERATED ALWAYS AS IDENTITY,
		Nome varchar(200) NOT NULL,
		DtNascimento date NOT NULL,
		Telemovel varchar(15) NOT NULL,
		ContactoEmergencia varchar(15) NOT NULL,
		Nacionalidade varchar(20) NOT NULL,
		Mercado varchar(40) references MERCADO(MercadoName),
		TipoDocIdent varchar(30) NOT NULL,
		DocIdent varchar(15) NOT NULL,
		TituloResidencia varchar(20),
		ManifestacaoInteresse varchar(20),
		ValidadeDocIdent date NOT NULL,
		CatProf varchar(7) references CATEGORIAS_PROFISSIONAIS(codigo) NOT NULL,
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
		deleted date default null,

		constraint chk_TipoSalario CHECK(TipoSalario IN('horario', 'fixo')),
		constraint chk_CartaConducao CHECK(CartaConducao IN('Sim', 'Nao'))
);

CREATE TABLE OBRA (
		CodigoInterno varchar(20) primary key,
        Designacao varchar(20) NOT NULL,
        Cliente varchar(20) NOT NULL,
        DataInicio date NOT NULL,
        DataFim date,
        Mercado varchar(40) references MERCADO(mercadoName),
        AutosDeMedicao varchar(100) NOT NULL,
		deleted date default null
);

CREATE TABLE FUNCIONARIOS_OBRAS(
		Funcionario varchar(15) references Funcionario(NIF),
		Obra varchar(20) references Obra(CodigoInterno),
		DataComeco date NOT NULL,
		DataFim date,  /* se a data estiver a null sinaliza que é a obra onde o funcionário se encontra atualmente.*/
		primary key(Funcionario, Obra, DataComeco)
);

CREATE TABLE DIA_TRABALHO(
		Funcionario varchar(15) references Funcionario(NIF),
        CodigoObra varchar(20)references Obra(CodigoInterno),
        Dia int NOT NULL,
		Horas decimal(2, 1) NOT NULL,
        Mes varchar(9) NOT NULL, 
        Ano varchar(4) NOT NULL,
        Valor decimal(5, 2) NOT NULL,
		constraint chk_Mes CHECK(Mes IN('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro')),
		primary key(Funcionario, CodigoObra, Dia, Mes, Ano)
);

CREATE TABLE SALARIO_FINAL(
		Id INT UNIQUE GENERATED ALWAYS AS IDENTITY, 
		Funcionario varchar(15) references Funcionario(NIF),
		Mes varchar(9) NOT NULL, 
        Ano varchar(4) NOT NULL,
        ValorFinal decimal(5, 2) NOT NULL,
		ValorAPagar decimal(5, 2),
		primary key(Funcionario, Mes, Ano)
);

CREATE TABLE FOLHA_DE_PONTO(
		Id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
		Mes varchar(9) NOT NULL, 
        Ano varchar(4) NOT NULL,
		Obra varchar(20) references Obra(CodigoInterno),
		Mercado varchar(40) references MERCADO(mercadoName),
		primary key(Mes,Ano,Obra)
);

CREATE TABLE FOLHAS_SALARIO(
		Id_salario int references SALARIO_FINAL(Id),
		Id_folha_de_ponto int references FOLHA_DE_PONTO(Id),
		primary key(Id_salario,Id_folha_de_ponto)
);

CREATE TABLE CONTA(
		Username varchar(40) primary key,
		Pwd varchar(64)
);
