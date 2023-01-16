INSERT INTO CATEGORIAS_PROFISSIONAIS
(codigo,nomenclatura) values
('1234567','XXXXXXX'),
('1243123','XXXXXXX');

INSERT INTO MERCADO
(mercadoName,sigla,dia_inicio,dia_fim) values
('portugal','PT',21,20),
('espanha','ES',26,25),
('franca','FR',21,20);

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
'22222222222222222222'),
('Andre Ferro','1999-03-04',
'914324322','214455444','Espanhola',
'espanha','CC','123321111',null,null,
'2025-03-03','1243123','321311322',
'12333221222','Rua Joao Andrade 520',
'2021-05-06','2023-05-06',900.0,
'horario',900.0,null,'Nao',
'12312232132113211133');

INSERT INTO OBRA
(codigointerno,designacao,cliente,
datainicio,datafim,mercado,autosdemedicao) values
('OB22ES01','Obra em Espanha','FCBarcelona',
'2022-08-09','2026-09-08','espanha',
'Autos de medicao'),
('OB22PT01','Obra de um edificio','ISEL',
'2022-05-09','2025-05-09','portugal',
'Autos de medicao'),
('OB21PT01','Obra de uma escola','ESEL',
'2021-06-30','2024-06-30','portugal',
'Autos de medicao'),
('OB22ES02','Obra de um estadio','Real Madrid',
'2022-07-09','2026-09-08','espanha',
'Autos de medicao'),
('OB22FR01','Obra de um estadio','PSG',
'2022-07-09','2026-09-08','franca',
'Autos de medicao');

INSERT INTO FUNCIONARIOS_OBRAS
(funcionario,obra,datacomeco,datafim) values
('234567899','OB22PT01','2022-05-21',null);

INSERT INTO DIA_TRABALHO
(funcionario,codigoobra,dia,horas,mes,ano,valor) values
('234567899','OB22PT01',21,8,'06','2022',56),
('234567899','OB22PT01',22,8,'06','2022',56),
('234567899','OB22PT01',23,8,'06','2022',56),
('234567899','OB22PT01',24,8,'06','2022',56),
('234567899','OB22PT01',25,8,'06','2022',56),
('234567899','OB22PT01',26,8,'06','2022',56),
('234567899','OB22PT01',27,8,'06','2022',56),
('234567899','OB22PT01',28,8,'06','2022',56),
('234567899','OB22PT01',29,8,'06','2022',56),
('234567899','OB22PT01',30,8,'06','2022',56),
('234567899','OB22PT01',1,8,'06','2022',56),
('234567899','OB22PT01',2,8,'06','2022',56),
('234567899','OB22PT01',3,8,'06','2022',56),
('234567899','OB22PT01',4,8,'06','2022',56),
('234567899','OB22PT01',5,8,'06','2022',56),
('234567899','OB22PT01',6,8,'06','2022',56),
('234567899','OB22PT01',7,8,'06','2022',56),
('234567899','OB22PT01',8,8,'06','2022',56),
('234567899','OB22PT01',9,8,'06','2022',56),
('234567899','OB22PT01',10,8,'06','2022',56),
('234567899','OB22PT01',11,8,'06','2022',56),
('234567899','OB22PT01',12,8,'06','2022',56),
('234567899','OB22PT01',13,8,'06','2022',56),
('234567899','OB22PT01',14,8,'06','2022',56),
('234567899','OB22PT01',15,8,'06','2022',56),
('234567899','OB22PT01',16,8,'06','2022',56),
('234567899','OB22PT01',17,8,'06','2022',56),
('234567899','OB22PT01',18,8,'06','2022',56),
('234567899','OB22PT01',19,8,'06','2022',56),
('234567899','OB22PT01',20,8,'06','2022',56);

INSERT INTO SALARIO_FINAL
(funcionario,mes,ano,valorfinal,valorapagar) values
('234567899','06','2022',999,999);

INSERT INTO FOLHA_DE_PONTO
(mes,ano,obra,mercado) values
('01','2022','OB22PT01','portugal'),
('02','2022','OB22PT01','portugal'),
('03','2022','OB22PT01','portugal'),
('04','2022','OB22PT01','portugal'),
('05','2022','OB22PT01','portugal'),
('06','2022','OB22PT01','portugal'),
('07','2022','OB22PT01','portugal'),
('08','2022','OB22PT01','portugal'),
('09','2022','OB22PT01','portugal'),
('09','2022','OB22ES01','espanha');

INSERT INTO FOLHAS_SALARIO
(id_salario,id_folha_de_ponto) values
(1,6);

INSERT INTO CONTA
(username,pwd) values
('afonso','afonso123');