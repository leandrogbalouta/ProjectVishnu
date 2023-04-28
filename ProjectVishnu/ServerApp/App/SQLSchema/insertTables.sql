INSERT INTO CATEGORIAS_PROFISSIONAIS
(codigo,nomenclatura) values
('CA1','Carpinteiro de primeira'),
('CA2','Carpinteiro de segunda'),
('PE1', 'Pedreiro de primeira');

INSERT INTO TIPO_DOC
(sigla, designacao) values
('CC', 'Cartão de Cidadão'),
('TR', 'Título de Residência'),
('MI', 'Manifestação de Interesse');

INSERT INTO MERCADO
(mercadoName,sigla,dia_inicio,dia_fim) values
('portugal','PT',21,20),
('espanha','ES',26,25),
('franca','FR',21,20);

INSERT INTO FUNCIONARIO 
(nome,dtnascimento,telemovel,contactoemergencia,nacionalidade,mercado,
tipodocident,docident,
validadedocident,catprof,nif,niss,morada,contratoinicio,
contratofim,vencimentobase,tiposalario,salarioreal,calcado,
cartaconducao,iban, passaporte) values
('Francisco Martins','1999-03-20',
'916705652','214439239','Portuguesa',
'portugal','CC','14627570',
'2023-03-01','CA1','255896379',
'12345678910','Rua Leandro Bolota n420',
'2021-03-09','2023-03-09',12.0,
'horario',10.0,null,true,
'0000000000000000000000', null),
('Afonso Ramos','1999-05-30',
'919929349','214456789','Portuguesa',
'portugal','TR','13456234',
'2027-08-29','CA2','234567899',
'10987654321','Rua Antonio Silva n14 3Esq',
'2020-05-30','2022-05-30',1200,
'fixo',1000,null,true,
'111111111111111111111', null),
('Joao Filipe','1985-06-07',
'967899876','214498672','Espanhola',
'espanha','MI','195345543',
'2023-09-09','CA2','244555678',
'12436587091','Rua Umberto Delgado n66',
'2019-08-20','2022-12-31',900.0,
'fixo',900.0,null,true,
'22222222222222222222', 'BA03923'),
('Andre Ferro','1999-03-04',
'914324322','214455444','Espanhola',
'espanha','CC','123321111',
'2025-03-03','PE1','321311322',
'12333221222','Rua Joao Andrade 520',
'2021-05-06','2023-05-06',10,
'horario',8,null,false,
'12312232132113211133',null);

INSERT INTO OBRA
(codigointerno,designacao,cliente,
datainicio,datafim,estado,mercado,autosdemedicao) values
('OB22ES01','Obra em Espanha','FCBarcelona',
'2022-08-09','2023-01-05','completada','espanha',
'Autos de medicao'),
('OB22PT01','Obra de um edificio','ISEL',
'2022-05-09',null,'em-curso','portugal',
'Autos de medicao'),
('OB21PT01','Obra de uma escola','ESEL',
null,null,'por-comecar','portugal',
'Autos de medicao'),
('OB22ES02','Obra de um estadio','Real Madrid',
'2022-07-09',null,'em-curso','espanha',
'Autos de medicao'),
('OB22FR01','Obra de um estadio','PSG',
'2022-07-09',null,'em-curso','franca',
'Autos de medicao');

INSERT INTO FUNCIONARIOS_OBRAS
(funcionario,obra,datacomeco,datafim) values
('234567899','OB22PT01','2022-05-21',null),
('255896379','OB22PT01','2022-05-21',null);

INSERT INTO TIPO_DE_USER (Tipo) values
('admin');

INSERT INTO CONTA
(Username, TipoDeUser, PasswordHash) values
('admin', 1, '0863F757E0EC7471A223B14B977F9D6158F2AEFFAAE255BFCDE5D188BCCAC825');