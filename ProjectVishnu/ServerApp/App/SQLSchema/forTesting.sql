DROP TABLE IF EXISTS INTERVALO_MERCADO;
DROP TABLE IF EXISTS CONTA;
DROP TABLE IF EXISTS SALARIO_FINAL;
DROP TABLE IF EXISTS DIA_TRABALHO;
DROP TABLE IF EXISTS FUNCIONARIOS_OBRAS;
DROP TABLE IF EXISTS OBRA;
DROP TABLE IF EXISTS FUNCIONARIO;
DROP TABLE IF EXISTS CATEGORIAS_PROFISSIONAIS;

CREATE TABLE CATEGORIAS_PROFISSIONAIS(
		codigo varchar(7) PRIMARY KEY,
		nomenclatura varchar(50) NOT NULL
);

CREATE TABLE FUNCIONARIO(
		Id INT GENERATED ALWAYS AS IDENTITY,
		Nome varchar(200) NOT NULL,
		DtNascimento date NOT NULL,
		Telemovel varchar(15) NOT NULL,
		ContactoEmergencia varchar(15) NOT NULL,
		Nacionalidade varchar(20) NOT NULL,
		Mercado varchar(40) NOT NULL,
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
        Mercado varchar(40) NOT NULL,
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
        Ano int NOT NULL,
        Valor decimal(5, 2) NOT NULL,
		constraint chk_Mes CHECK(Mes IN('janeiro', 'fevereiro', 
        'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 
        'setembro', 'outubro', 'novembro', 'dezembro')),
		primary key(Funcionario, CodigoObra, Dia, Mes, Ano)
);

CREATE TABLE SALARIO_FINAL(
		Funcionario varchar(15) references Funcionario(NIF),
		Mes varchar(9) NOT NULL, 
        Ano int NOT NULL,
        ValorFinal decimal(5, 2) NOT NULL,
		ValorAPagar decimal(5, 2),
		primary key(Funcionario, Mes, Ano)
);

CREATE TABLE CONTA(
		Username varchar(40) primary key,
		Pwd varchar(64)
);

CREATE TABLE INTERVALO_MERCADO(
		Mercado varchar(40) primary key,
		Dia_Inicio int,
		Dia_Fim int
);


INSERT INTO CATEGORIAS_PROFISSIONAIS
(codigo,nomenclatura) values
('1234567','XXXXXXX'),
('1243123','XXXXXXX');

INSERT INTO FUNCIONARIO 
(nome,dtnascimento,telemovel,contactoemergencia,nacionalidade,mercado,
tipodocident,docident,tituloresidencia,manifestacaointeresse,
validadedocident,catprof,nif,niss,morada,contratoinicio,
contratofim,vencimentobase,tiposalario,salarioreal,calcado,
cartaconducao,iban) values
('Francisco Martins','1999-03-20',
'916705652','214439239','Portuguesa',
'portugal','CC','14627570',null,null,
'2025-09-19','1234567','255896379',
'12345678910','Rua Leandro Bolota n420',
'2021-03-09','2023-03-09',800.0,
'fixo',800.0,null,'Sim',
'0000000000000000000000'),
('Afonso Ramos','1999-05-30',
'919929349','214456789','Portuguesa',
'portugal','CC','13456234',null,null,
'2027-08-29','1243123','234567899',
'10987654321','Rua Antonio Silva n14 3Esq',
'2020-05-30','2022-05-30',900.0,
'fixo',900.0,null,'Sim',
'111111111111111111111'),
('Joao Filipe','1985-06-07',
'967899876','214498672','Espanhola',
'espanha','CC','195345543',null,null,
'2023-09-09','1243123','244555678',
'12436587091','Rua Umberto Delgado n66',
'2019-08-20','2022-12-31',900.0,
'horario',900.0,null,'Sim',
'22222222222222222222');

INSERT INTO OBRA
(codigointerno,designacao,cliente,
datainicio,datafim,mercado,autosdemedicao) values
('OB22ES01','Obra em Espanha','FCBarcelona',
'2022-08-09','2026-09-08','espanha',
'Autos de medicao'),
('OB22PT01','Obra de um edificio','ISEL',
'2022-05-09','2025-05-09','portugal',
'Autos de medicao');

INSERT INTO FUNCIONARIOS_OBRAS
(funcionario,obra,datacomeco,datafim) values
('255896379','OB22PT01','2022-05-10',
null);